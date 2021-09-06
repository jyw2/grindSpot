import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CentralData } from '../centralizedData.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  @Input() public title:string = 'Top Silver Per Hour (Avg)'
  @Input() public units:string = 'Million Silver/Hour'

  //filters
  public time:number = 1
  public class:number = 1
  public APStart:string = ''//empty means all
  public APEnd:string = ''//empty means all
  public DPStart:string = ''//empty means all
  public DPEnd:string = ''//empty means all


  //class list
  public classes:string[]


  public grindSpots:{name:string, quantity:number}[] =
     [{name:'Fogans', quantity:30}, {name:'Stars End', quantity:200}]
  private timer = interval(120000)//how often the ranks are updated
  private intervalSub:Subscription

  constructor(private routerService:Router, private http:HttpClient,private data:CentralData) { }

  ngOnInit(): void {
    this.updateRanks()
    //start the update cycle
    this.intervalSub  = this.timer.subscribe(()=>{
      this.updateRanks()
    })

    this.classes = this.data.getClasses()
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe()
  }

  spotSelected(name:any){
    //Redirect to the specefic grindspot page
    this.routerService.navigate(['/spot',this.websafe(name)])
    console.log(this.websafe(name))
  }

  websafe(name:string){
    //replaces spaces with - and ' with nothing
    name = name.replace(' ','-')
    name = name.replace("'","")
    return name
  }

  updateRanks(){
    //update the ranking
    console.log('updating')
    this.http.get(`https://api.jyuenw.com/grind/silver?time=${this.time}&class=${this.class}&APStart=${this.APStart}&APEnd=${this.APEnd}&APStart=${this.DPStart}&APEnd=${this.DPEnd}`).subscribe(( serverSpots:any)=>{
      this.grindSpots = serverSpots
    })
  }



}
