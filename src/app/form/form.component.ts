import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralData } from '../centralizedData.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  //defaults
  public before:string
  public after:string
  public gain:string
  public time:string
  public class:string = ''
  @Input()public spot:string = ''//accesed on grindspot pages
  @Input() public defaultSpot:string
  public AP:string
  public DP:string
  public agris:any
  public boosts:string
  public private:boolean = false

  //alerts
  public invalid:boolean = false
  public invalidMessage:string
  public successMessage:string
  public success:boolean = false

  public loggedIn:boolean
  private loggedInSub: Subscription
  public classes:string[]
  public spots:string[]

  constructor(private data:CentralData, private http:HttpClient ) { }

  ngOnInit(): void {
    this.classes = this.data.getClasses()
    this.spots = this.data.getSpots()
    this.loggedIn = this.data.getLoginState()

    this.loggedInSub =this.data.getChangesSubj().subscribe((state) =>{
      console.log('form login state changed')
      this.loggedIn = state
    })

    //TODO if logged in, autofill using last response
  }

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe()

  }

  packageData(){
    let sph
    if(this.gain){
      sph = (parseInt(this.gain)/(parseInt(this.time)/60))
    }else{
      sph = (parseInt(this.after)-parseInt(this.before))/(parseInt(this.time)/60)
    }
    sph = Math.floor(sph)

    let ag
    if( this.agris === 'yes'){
      ag = true
    }else{
      ag = false
    }

    let dt = new Date()
    let dtString = dt.getFullYear() +'/'+
    (dt.getMonth() < 10? '0'+(dt.getMonth()+1): dt.getMonth() )
    +'/'+ (dt.getDate() < 10? '0'+dt.getDate(): dt.getDate() )



    let pack = {
      silverPerHour: sph,
      AP: this.AP,
      DP: this.DP,
      class: this.class,
      agris: ag,
      boosts: this.boosts ? this.boosts : 0,
      date: dtString,
      id:this.data.getLoginState()? localStorage.getItem('token'):'',
      private: this.private
    }

    return pack
  }

  formSubmit(){
    //sends form to data base
      this.hideAlerts()

    //validate for no empty or negative inputs
      if(this.AP && this.DP && (this.gain || (this.before && this.after)) &&
      this.time &&this.spot && this.class){
        if(+this.AP > 0 && +this.DP > 0 && (+this.gain > 0 || (+this.before > 0 && +this.after > 0)) && +this.time > 0)
        {
           //validation ok

            // this.http.post('https://api.jyuenw.com/grind/spot/', this.packageData()).subscribe(()=>{
            this.http.post('http://localhost:3001/grind/spot/'+ this.spot, this.packageData()).subscribe((res:any)=>{
              if (res.success){
                console.log('add success')
                this.clear()
                this.successAlert('Grind session succesfully added!')
              }else{
                this.invalidAlert('Grind session could not be added, our servers are currently having problems')
              }
            },()=>{
              //call failed
              this.invalidAlert('Grind session could not be added, please try again.')
            })

        }else{
          //negative numbers
          this.invalidAlert('Grind session could not be added, negative values are not allowed')
        }
      }else{
        //non valid inputs
        this.invalidAlert('Grind session could not be added, please check that all required inputs were entered and try again.')
      }



  }

  hideAlerts(){
     this.invalid= false
     this.success= false
  }

  successAlert(message:string){
    this.success = true
    this.successMessage = message
  }

  invalidAlert(message:string){
    this.invalid = true
    this.invalidMessage = message
  }

  swapGain(){
    //use delta silver for calculations
    this.after =''
    this.before = ''
  }

  swapBF(){
    //use net gain for s/h calculations
    this.gain = ''
  }

  clear(){
    (this.before as string) = ''
    this.after = ''
    this.gain = ''
    this.time = ''
    this.class = ''
    this.spot = this.defaultSpot
    this.AP = ''
    this.DP = ''
    this.boosts = ''
  }
}
