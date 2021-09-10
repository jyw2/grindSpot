import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

@Injectable({providedIn: 'root'})
export class CentralData {

  private classes:string[] = ['Warrior','Ranger','Sorceress','Berserker','Tamer','Musa',
  'Maehwa','Valkerie', 'Kunoicihi', 'Ninja','Wizard','Witch','Dark Knight',
   'Striker','Mystic','Archer','Lahn','Shai', 'Guardian', 'Hashashin','Nova',
   'Sage','Corsair']

  private spots: string[]  = ['Fogans', 'Helms', 'Bandits'
  , 'Rogues']

  private loggedIn:boolean = false

  private authChange = new Subject<boolean>()


  constructor(private http: HttpClient){
    let timeout = localStorage.getItem('timeout')
    if (timeout){
      if(+timeout > (new Date()).getTime()){
        //swith UI to logged in
        this.loggedIn = true
        setTimeout(()=>{
          //auto refresh the token
          http.post('https://identitytoolkit.googleapis.com/v1/token?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',{
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refresh')
          }).subscribe((response:any)=>{
            //login found
            localStorage.setItem('token', response.idToken)
            localStorage.setItem('refresh', response.refresh_token)
            //store time of expiration in milliseconds
            localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
          },(error)=>{
            console.log(error)
          })

        }, ((new Date()).getTime())- (+timeout))
      }else{
        //refresh the token now
        http.post('https://identitytoolkit.googleapis.com/v1/token?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',{
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refresh')
          }).subscribe((response:any)=>{
            //login found
            localStorage.setItem('token', response.idToken)
            localStorage.setItem('refresh', response.refresh_token)
            //store time of expiration in milliseconds
            localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
          },(error)=>{
            console.log(error)
          })

      }
    }else{
      //do nothing
    }
  console.log(this.loggedIn)
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
