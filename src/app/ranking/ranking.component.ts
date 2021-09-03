import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public grindSpots:string[] = ['Fogans', 'Helms','Stars End']


  constructor() { }

  ngOnInit(): void {
  }

  spotSelected(name:any){
    //Redirect to the specefic grindspot page

  }

}
