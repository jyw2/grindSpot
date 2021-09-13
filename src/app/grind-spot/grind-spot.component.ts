import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CentralData } from '../centralizedData.service';
import { QueryService } from '../query.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-grind-spot',
  templateUrl: './grind-spot.component.html',
  styleUrls: ['./grind-spot.component.css']
})
export class GrindSpotComponent implements OnInit, OnDestroy {

  public title:string = 'Fogans'
  public graphSub:Subject<[]> =  new Subject()


  //tracks if on a user spot or general spot page
  @Input() public userVer:boolean = false

  //chart data
  public chartData: any = [
    {
      "name": "",
      "series": []
    }
  ]

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

  //errors
  public invalid = false
  public invalidMessage = ''

  constructor(private routerService:Router,
    private http:HttpClient,private data:CentralData,
    private route:ActivatedRoute,
    private query:QueryService){}

  ngOnInit(): void {
    this.classes = this.data.getClasses()
    this.title = this.unWebsafe(this.route.snapshot.params['spot'])
    this.getData

    //redirect if not logged in
    // if(this.route.snapshot.params['state'] == 'user' && !this.data.getLoginState()){
    //   this.routerService.navigate(['/login'])
    // }
     //switch to user grinds if accesssing the user version of the spot
    this.userVer = this.route.snapshot.params['state'] == 'user'? true: false

    this.getData()

    //TODO if logged in, autofill using last response
  }

  ngOnDestroy(): void {

  }


  async getData(){
    //gets points from API and plots it on the graph

    this.invalid = false
    let sessions:any
    let points:any = []

    //get data from API
    this.query.spotQuery(this.time,this.class,this.APStart,
    this.APEnd,this.DPStart,this.DPEnd, this.agris,this.boosts,this.userVer,this.title).then((sessionsRaw:any)=>{
        sessions = sessionsRaw

        //skip graphing if no sessions
        if (sessions.length == 0){
          this.invalidAlert('No sessions exist for these filters, please try another combination.')
          return
        }

        console.log(sessions)

        //format data for graph
        for (let session of sessions){
          points.push({
          "name":
          `AP: ${session.AP} | DP: ${session.DP} | Class: ${session.class} | Boosts: +${session.boosts}%`,
          "x": session.date,
          "y": parseInt(session.silverPerHour),
          "r": 2})
        }

        //send to graph
        this.chartData[0].series = points
        this.graphSub.next(this.chartData)
    })


  }

  invalidAlert(message:string){
    //send a alert to user
    this.invalid = true
    this.invalidMessage = message
  }

  switchStates(){
    this.userVer = ! this.userVer

    // redirect if not logged in
    if(!this.data.getLoginState()){
      this.routerService.navigate(['/login'])
    }

    this.getData()

  }



  unWebsafe(name:string){
    //converts websafe string back into normal text
    name = (name as string).replace('-',' ')
    name = (name as string).replace("~","'")
    return name
  }

}
