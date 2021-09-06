import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  public true = true
  @Input() public chartData:any = [
    {
      "name": "",
      "series": [
        {
          "name": "2010",
          "x": '2020/01/1',
          "y": 80.3,
          "r": 2
        },
        {
          "name": "2000",
          "x": '1999/01/06',
          "y": 80.3,
          "r": 2
        },
        {
          "name": "1990",
          "x":  '1999/03/01',
          "y": 75.4,
          "r": 2
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
