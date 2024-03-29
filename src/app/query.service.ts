import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({providedIn: 'root'})
export class  QueryService{
  //holds functions for querying the database

  constructor(private http:HttpClient){}


  // private domain:string = 'http://localhost:3001' //dev
  private domain:string = 'https://jyuenwapi.azurewebsites.net' //production

  async spotQuery(time:number, Class:string,APStart:string, APEnd:string,
  DPStart:string, DPEnd:string,agris:boolean,boosts:boolean,userVer:boolean,
  spot:string){
      //query for a list of sessions based on filters

      let sessions

      //returns packed query string with filters
      let epochTime
      if(time == 1){
        //past year
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 365)
      }else if(time == 2) {
        //past month
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 30)
      }else {
        //past week
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 7)
      }
      //note: time is sent as min epoch time of the session in days



      //DO NOT UNTAB THIS BLOCK OR THE QUEY STRING WILL BE BROKEN
      let q = `?
time=${epochTime}&
class=${Class}&
APStart=${APStart}&
APEnd=${APEnd}&
DPStart=${DPStart}&
DPEnd=${DPEnd}&
agris=${agris}&
boosts=${boosts}&
id=${userVer? localStorage.getItem('token'):''}`
      //send the id if on a user specefic spot, otherwise send an empty string

      //send query to server
      await this.http.get(this.domain + '/grind/spot/' + spot+q).toPromise().then((data)=>{
        sessions = data
      }).catch(()=>{
        console.log('query failed')
      })
      return sessions
  }

  async silverQuery(time:number, Class:string,APStart:string, APEnd:string,
  DPStart:string, DPEnd:string,agris:boolean,boosts:boolean){
      //query for a list of sessions based on filters
      let sessions

      //returns packed query string with filters
      let epochTime
      if(time == 1){
        //past year
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 365)
      }else if(time == 2) {
        //past month
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 30)
      }else {
        //past week
        epochTime = Math.floor(((new Date()).getTime())/86400000 - 7)
      }
      //note: time is sent as min epoch time of the session in days



      //DO NOT UNTAB THIS BLOCK OR THE QUERY STRING WILL BE BROKEN
      let q = `?
time=${epochTime}&
class=${Class}&
APStart=${APStart}&
APEnd=${APEnd}&
DPStart=${DPStart}&
DPEnd=${DPEnd}&
agris=${agris}&
boosts=${boosts}`
      //send the id if on a user specefic spot, otherwise send an empty string

      //send query to server
      await this.http.get(this.domain + '/grind/silver'+q).toPromise().then((data)=>{
        sessions = data
      }).catch(()=>{
        console.log('query failed :(')
      })

      return sessions
  }

  async popularQuery(time:number, Class:string,APStart:string, APEnd:string,
    DPStart:string, DPEnd:string,agris:boolean,boosts:boolean){
        //query for a list of sessions based on filters

        let sessions

        //returns packed query string with filters
        let epochTime
        if(time == 1){
          //past year
          epochTime = Math.floor(((new Date()).getTime())/86400000 - 365)
        }else if(time == 2) {
          //past month
          epochTime = Math.floor(((new Date()).getTime())/86400000 - 30)
        }else {
          //past week
          epochTime = Math.floor(((new Date()).getTime())/86400000 - 7)
        }
        //note: time is sent as min epoch time of the session in days



        //DO NOT UNTAB THIS BLOCK OR THE QUERY STRING WILL BE BROKEN
        let q = `?
time=${epochTime}&
class=${Class}&
APStart=${APStart}&
APEnd=${APEnd}&
DPStart=${DPStart}&
DPEnd=${DPEnd}&
agris=${agris}&
boosts=${boosts}`
        //send the id if on a user specefic spot, otherwise send an empty string

        //send query to server
        await this.http.get(this.domain + '/grind/popular'+q).toPromise().then((data)=>{
          console.log( data)
          sessions = data
        }).catch(()=>{
          console.log('query failed')
        })

        return sessions
  }

  async userSpotsQuery (id:string | null){
    //get all spots the user has records on
    let spots:any = []
    const q = '?id='+ id
    await this.http.get(this.domain + '/grind/user' + q).toPromise().then((data)=>{
      spots = data
    }).catch(()=>{
      console.log('query failed')
    })
    return spots
  }

}
