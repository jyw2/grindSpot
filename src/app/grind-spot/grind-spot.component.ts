import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CentralData } from '../centralizedData.service';
import { queryService } from '../query.service';

@Component({
  selector: 'app-grind-spot',
  templateUrl: './grind-spot.component.html',
  styleUrls: ['./grind-spot.component.css']
})
export class GrindSpotComponent implements OnInit {

  public title:string = 'Fogans'


  //tracks if on a user spot or general spot page
  public userVer:boolean = false

  //chart data
  public chartData: any

  //filters
  public time:number = 1
  public class:string  = "All"
  public APStart:string = ''//empty means all
  public APEnd:string = ''//empty means all
  public DPStart:string = ''//empty means all
  public DPEnd:string = ''//empty means all
  public agris:boolean = false
  public boosts:boolean = false

  //class list
  public classes:string[]

  constructor(private routerService:Router,
    private http:HttpClient,private data:CentralData,
    private route:ActivatedRoute,
    private query:queryService){}

  ngOnInit(): void {
    this.classes = this.data.getClasses()
    this.title = this.unWebsafe(this.route.snapshot.params['spot'])
    this.getData
  }

  getData(){
    //gets points from API and plots it on the graph
    this.chartData =  this.query.spotQuery(this.time,this.class,this.APStart, this.APEnd,this.DPStart,this.DPEnd, this.agris,this.boosts,this.userVer,this.title)
    console.log(this.chartData)
  }



  unWebsafe(name:string){
    //converts websafe string back into normal text
    name = (name as string).replace('-',' ')
    name = (name as string).replace("~","'")
    return name
  }

}
