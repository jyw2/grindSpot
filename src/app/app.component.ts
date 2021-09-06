import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralData } from './centralizedData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{

  public loggedIn:boolean = false

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
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  logout(){
    this.data.logOut()
  }
}
