import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  @Input() public title:string = 'Top Silver Per Hour'
  @Input() public units:string = 'Million Silver/Hour'


  public time:number = 1
  public grindSpots:{name:string, quantity:number}[] =
     [{name:'Fogans', quantity:30}, {name:'Stars End', quantity:200}]
  private timer = interval(120000)//how often the ranks are updated
  private intervalSub:Subscription
  constructor(private routerService:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.updateRanks()
    //start the update cycle
    this.intervalSub  = this.timer.subscribe(()=>{
      this.updateRanks()
    })
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
    this.http.get('https://api.jyuenw.com/grind/silver?time='+this.time).subscribe(( serverSpots:any)=>{
      this.grindSpots = serverSpots
    })
  }



}
