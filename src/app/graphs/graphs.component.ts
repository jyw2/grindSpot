import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {

  public true = true
  @Input() incomingData:Subject<[]>
  private incomingDataSub: Subscription

  public chartData:any = [
    {
      "name": "",
      "series": [
      ]
    }
  ]


  constructor() { }

  ngOnInit(): void {
    this.incomingDataSub = this.incomingData.subscribe((data:any)=>{
      this.chartData = [...data]

    })
  }

  ngOnDestroy(): void{
    this.incomingDataSub.unsubscribe()
  }

}
