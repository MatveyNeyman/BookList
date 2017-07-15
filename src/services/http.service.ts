import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    private getListUrl = 'http://localhost:8080/get-list';
    private postListUrl = 'http://localhost:8080/post-list';
    private postImageUrl = 'http://localhost:8080/post-image';
    
    // private getListUrl = 'https://book-list-matvey-neyman.herokuapp.com/get-list';
    // private postListUrl = 'https://book-list-matvey-neyman.herokuapp.com/post-list';
    // private postImageUrl = 'https://book-list-matvey-neyman.herokuapp.com/post-image';
    
    constructor (private http: Http) { }
    
    public getData(): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getListUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public postData(data: any): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postListUrl, JSON.stringify(data), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public saveImage(image: File, fileName: string): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData();
            formData.append('image', image);
            formData.append('name', fileName);

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('POST', this.postImageUrl, true);
            xhr.send(formData);
        });
    }
    
    private extractData(res: Response) {
        return res.json() || { };
    }
    
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}