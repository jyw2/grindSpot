import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

@Injectable({providedIn: 'root'})
export class CentralData {

  private classes:string[] = ['Warrior','Ranger','Sorceress','Berserker','Tamer','Musa',
  'Maehwa','Valkerie', 'Kunoicihi', 'Ninja','Wizard','Witch','Dark Knight',
   'Striker','Mystic','Archer','Lahn','Shai', 'Guardian', 'Hashashin','Nova',
   'Sage','Corsair']

  private spots: string[]  = ['Mansha Forest', 'Catfishman Camp', 'Lake Kaia', 'Rhutum Outstation', 'Rhutum Sentry Post',
'Hexe Sanctuary', 'Marie Cave', 'LongLeaf Tree Sentry Post', 'LongLeaf Tree Forest', 'Cyclops Land', 'North kaia Mountain', 'Abandoned Monastery',
'Padix Island', 'Abandoned Iron Mine', 'Rhutum', 'Saunil', 'Manes', 'Rogues', 'Helms', "Elric Shrine", 'Canyon of Corrupttion', 'Soldiers Cemetery',
'Sausan Garrison', 'Sausan Garrison Wharf', 'Hasrah Cliff', 'Kratuga Ancient Ruins', 'Bashim Base', 'Titium Valley', 'Desert Naga Temple', 'Waragon Nest',
'Gahaz','Cadry Ruins', 'Crescent Shrine', 'Taphtar Plain', 'Basilisk Den', 'Pila Ku Jail', 'Roud Sulfur Works', 'Aakman Temple', 'Hystria Ruins',
'Pollys Forest', 'Loopy Tree Forest', 'Navarn Steppe', 'Manshaum Forest', 'Tooth Fairy Forest', 'Mirumok Ruins', 'Gyfin Rhasia Temple', 'Tshira Ruins'
,'Khalk Canyon', 'Blood Wolf Settlement', 'Shrekhan Necropolis', 'Protty Cave','Sycraia Underwater Ruins', 'Stars End', 'Ash Forest', 'Thornwood Forest',
'Tunkuta', 'Oluns Valley', 'Crypt of Resting Thoughts', 'Biraghi Den', 'Northern Plain of Serendia', 'Southern Cienaga', 'Gilsh Swamp', 'Castle Ruins', 'Orc Camp'
,'Bloody Monastery' ]

  private loggedIn:boolean = false

  private authChange = new Subject<boolean>()


  constructor(private http: HttpClient){

    //check if we need to refresh the token and are already logged in
    let timeout = localStorage.getItem('timeout')
    // console.log('timeout is: ' + timeout+', current time is: ' +(new Date()).getTime())
    if (timeout){
      if(+timeout > (new Date()).getTime()){
        //swith UI to logged in

        console.log('Logged in previosly')

        this.loggedIn = true
        setTimeout(()=>{
          //auto refresh the token
          this.refreshToken()
        }, ((+timeout)-(+(new Date()).getTime())) )
      }else{
        //refresh the token now
        this.refreshToken()
      }
    }else{
      //do nothing
    }
  console.log(this.loggedIn)
  }

  refreshToken(){
    //refresh token
    console.log('Refreshing token...')
    this.http.post('https://identitytoolkit.googleapis.com/v1/token?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',{
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refresh')
        }).subscribe((response:any)=>{
          //login found
          localStorage.setItem('token', response.id_token)
          localStorage.setItem('refresh', response.refresh_token)
          //store time of expiration in milliseconds
          localStorage.setItem('timeout',  (+((new Date()).getTime())+(+response.expires_in)*1000).toString())
          this.logIn()
        },(error)=>{
          console.log(error)
        })
    }

  getClasses(){
  //  return a copy of all classes alphabetically
    return [...this.classes.sort()]
  }

  getSpots(){
    //return  a copy of all grindspots alphabetically
    return [...this.spots.sort()]
  }


  getLoginState(){
    return this.loggedIn
  }

  logIn(){
    this.loggedIn = true
    this.authChange.next(true)
  }

  logOut(){
    this.loggedIn = false
    this.authChange.next(false)
    localStorage.removeItem('token')
    localStorage.removeItem('timeout')
  }

  getChangesSubj(){
    return this.authChange
  }


}
