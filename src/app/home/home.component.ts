import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater then 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }), 
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      ).subscribe(
      (data: number) => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
