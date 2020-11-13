import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnChanges {

  @Input() initialOffset: number;
  @Input() time: number;
  @Input() circleColor: string;
  @Input() letterColor: string;
  @Input() fill: string;
  @Input() strokeWidth: string;
  @Input() fontLetter: string;
  @Input() size: number;

  @Output() actionTimmer = new EventEmitter<string>();

  showTime: string;
  initialOffsetLong: number;
  fijo: number;

  constructor() {
  }
  ngOnChanges() {

    if (!this.initialOffset) return false;

    this.actionTimmer.emit(JSON.stringify({ state: 'init', msg: 'iniciando...' }));

    this.initialOffsetLong = this.initialOffset / (2 * Math.PI);
    let fijoTime = this.time;
    let i = 1;
    this.fijo = this.initialOffset;

    const interval = setInterval(() => {

      this.showTime = this.secondsToString(fijoTime - i);

      if (i == fijoTime) {

        this.actionTimmer.emit(JSON.stringify({ state: 'finish', msg: 'finalizado...' }));
        clearInterval(interval);
        return;
      }

      this.initialOffset = this.fijo - ((i + 1) * (this.fijo / fijoTime));

      i++;
    }, 1000);
  }

  ngOnInit(): void {
    // console.log(this.initialOffset);


  }

  secondsToString(seconds) {
    let minute = Math.floor((seconds / 60) % 60);
    let min = (minute < 10) ? '0' + minute : minute;
    let second = seconds % 60;
    let sec = (second < 10) ? '0' + second : second;
    return min + ':' + sec;
  }

}
