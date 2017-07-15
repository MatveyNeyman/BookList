const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path');

const pages = [
  '',
  '/home',
  '/book-list',
  '/layout-exercise'
];

const getBookList = '/get-list';
const postBookList = '/post-list';
const postImage = '/post-image';
const getImage = '/public/book_images/*';

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

app.get(pages, function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get(getBookList, function(req, res) {
  res.sendFile(__dirname + '/public/book_list.json');
});


app.use(bodyParser.json());

app.post(postBookList, function(req, res) {
  var data = req.body;
  saveJSON(data, function(err) {
    if (err) {
      res.status(404).send({ "response": "List not saved" });
      return;
    }
    res.send({ "response": "List saved" });
    clearFolder();
  });
});

function saveJSON(data, callback) {
  fs.writeFile(__dirname + '/public/book_list.json', JSON.stringify(data), callback);
}

function clearFolder() {
  fs.readFile(__dirname + '/public/book_list.json', 'utf8', function (err, data) {
    if (err) throw err;
    
    var list = JSON.parse(data);
    var fileNamesToKeep = [];
    
    for (var i = 0; i < list.length; i++) {
      if (list[i].image) {
        fileNamesToKeep.push(list[i].image);
      }
    }

    // Delete unused image files
    fs.readdir(__dirname + '/public/book_images/', function(err, fileNames) {
      for (var i = 0; i < fileNames.length; i++) {
        if (fileNamesToKeep.indexOf(fileNames[i]) < 0) {
          fs.unlink(__dirname + '/public/book_images/' + fileNames[i], function(err) {
              if (err) throw err;
              console.log("Images folder cleaned");
          });
        }
      }
    });
  });
}

app.post(postImage, function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var oldpath = files.image.path;  
      var newpath = __dirname + '/public/book_images/' + fields.name;    
      
      fs.readFile(oldpath, function(err, data) {
          if (err) throw err;
          fs.writeFile(newpath, data, function(err) {
              if (err) throw err;
              res.send({
                "response": "Image saved",
                "imagePath": newpath
              });
              res.end();
          });

          // Delete temp file
          fs.unlink(oldpath, function(err) {
              if (err) throw err;
          });
      });
    });
});

app.get(getImage, function(req, res) {
  console.log("Get image: " + req.url);
  var path = req.url;
  var arr = path.split("/");
  var fileName = arr.pop();
  res.sendFile(__dirname + '/public/book_images/' + fileName);
});

