import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CentralData } from '../centralizedData.service';
import { QueryService } from '../query.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {
  //holds top 10 of silver per hour or popularity

  @Input() public title:string = 'Top Silver Per Hour (Avg)'
  @Input() public units:string = 'Million Silver/Hour'

  //filters
  public time:number = 1
  public class:string = 'All'
  public APStart:string = ''//empty means all
  public APEnd:string = ''//empty means all
  public DPStart:string = ''//empty means all
  public DPEnd:string = ''//empty means all
  public agris:boolean = false
  public boosts:boolean = false


  //available classes
  public classes:string[]

  //Spots that are rendered
  public grindSpots:{name:string, quantity:number}[] =
     [{name:'Loading...', quantity:30}]

  //misc vars
  private timer = interval(3600000)//how often the ranks are updated
  private intervalSub:Subscription

  constructor(private routerService:Router, private http:HttpClient,private data:CentralData,
    private queryService: QueryService) { }

  ngOnInit(): void {
    this.updateRanks()

    //start the update cycle
    this.intervalSub  = this.timer.subscribe(()=>{
      this.updateRanks()
    })

    //fill data
    this.classes = this.data.getClasses()
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe()
  }

  spotSelected(name:any){
    //Redirect to the specefic grindspot page
    this.routerService.navigate(['/spot',this.websafe(name)])
  }

  websafe(name:string){
    //replaces spaces with - and ' with nothing
    name = (name as string).replace(' ','-')
    name = (name as string).replace("'","~")
    return name
  }

  async updateRanks(){
    //update the ranking
    if(this.title == 'Most Popular'){
      //get service to call API for top popularity
      await this.queryService.popularQuery(this.time,this.class, this.APStart, this.APEnd, this.DPStart,this.DPEnd,
        this.agris,this.boosts)
        .then((spots:any)=>{
          //sessions received
          this.grindSpots = spots
        }).catch(()=>{
          //call failed on service's end
          console.log('query service failed')
        })
    }else{
      //get service to call API for top silver
    await this.queryService.silverQuery(this.time,this.class, this.APStart, this.APEnd, this.DPStart,this.DPEnd,
      this.agris,this.boosts)
      .then((spots:any)=>{
        //sessions received
        this.grindSpots = spots

      }).catch(()=>{
        //call failed on service's end
        console.log('query service failed')
      })
    }
  }
}
