import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit, OnDestroy {
  timer;
  num_1: number = 3;
  num_2: number = 2;
  num_sum: number;

  time_delta: number;
  time_average: number;

  str_time_average: string;
  message: string;
  status: string;

  success: string = "success";
  error: string = "error";

  constructor() { }

  generateNum(): void{
    this.num_1 = Math.floor(Math.random() * 10);
    this.num_2 = Math.floor(Math.random() * 10);
    this.num_sum = null;
    this.time_delta = 0;
    this.status = null;
    this.startTimer();
  }

  startTimer(){
    this.timer = timer(0, 10).subscribe(val => this.calTime());
  }

  calTime(){
    this.time_delta += 1;
  }

  get time(){
    const min: number = Math.floor(this.time_delta / 100 / 60);
    const str_min: string = min < 10 ? `0${min}`: min.toString();

    const sec: number = Math.floor(this.time_delta / 100);
    const str_sec: string = sec < 10 ? `0${sec}`: sec.toString();

    const msec: number = this.time_delta % 100;
    const str_msec: string = msec < 10 ? `0${msec}`: msec.toString();

    return `${str_min}:${str_sec}.${str_msec}`;
  }

  sumChanged(): void{
    if (this.num_sum === this.num_1 + this.num_2){
      this.status = "success";
      this.message = "Correct!";
      this.time_average = this.time_average ? (this.time_average + this.time_delta) / 2: this.time_delta;
      this.str_time_average = (this.time_average / 100).toFixed(2);
      this.timer.unsubscribe();
      setTimeout(() => {
        this.generateNum();
      }, 2000);
    }
    else if(this.num_sum){
      this.status = "error"
      this.message = "Wrong Answer!";
    }
  }

  ngOnInit(): void {
    this.generateNum();
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }

}
