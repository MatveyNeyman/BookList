import { Component } from '@angular/core';

@Component({
  selector: 'layout-exercise',
  templateUrl: './layoutExercise.html',
  styleUrls: ['./layoutExercise.css']
})
export class LayoutExercise {
  public isRTL: boolean = false;
  onSwitchDirection() {
    this.isRTL = !this.isRTL;
  }
}