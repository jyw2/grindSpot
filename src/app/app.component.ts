import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralData } from './centralizedData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{

  public matchedSpots: string[]
  public loggedIn:boolean = false
  public spots: string[]
  public search: string

  title = 'grindSpot';

  private authSub:Subscription

  constructor(private data:CentralData){}

  ngOnInit(): void {
    //change navigation options based on login state
    this.authSub = this.data.getChangesSubj().subscribe((state:any)=>{
      this.loggedIn = state
    })
    //initial check
    this.loggedIn = this.data.getLoginState()

    this.spots = this.data.getSpots()
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  logout(){
    this.data.logOut()
  }

  updateSearch(){
    //refresh the search results
    setTimeout(() => {
      console.log(this.search)
      if(this.search){
        this.matchedSpots = []
        for(let spot of this.spots){
          console.log(spot)
          if(spot.toLowerCase().includes(this.search.toLowerCase())){
            this.matchedSpots.push(spot)
          }
        }

      }
    }, 300);


  }
}
