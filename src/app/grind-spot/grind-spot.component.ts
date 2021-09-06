import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CentralData } from '../centralizedData.service';

@Component({
  selector: 'app-grind-spot',
  templateUrl: './grind-spot.component.html',
  styleUrls: ['./grind-spot.component.css']
})
export class GrindSpotComponent implements OnInit {

  public title:string = 'Fogans'

  //filters
  public time:number = 1
  public class:number = 1
  public APStart:string = ''//empty means all
  public APEnd:string = ''//empty means all
  public DPStart:string = ''//empty means all
  public DPEnd:string = ''//empty means all

  //class list
  public classes:string[]

  constructor(private routerService:Router,
    private http:HttpClient,private data:CentralData,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.classes = this.data.getClasses()
    this.title = this.unWebsafe(this.route.snapshot.params['spot'])
  }

  getData(){
    //gets points from API and plots it on the graph

  }


  unWebsafe(name:string){
    //converts websafe string back into normal text
    name = (name as string).replace('-',' ')
    name = (name as string).replace("~","'")
    return name
  }

}
