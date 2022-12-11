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
  //Component for a user to add a grind session

  //default form values
  public before: string
  public after: string
  public gain: string
  public time: string
  public class: string = ''
  @Input() public spot: string = ''//accesed on grindspot pages
  @Input() public defaultSpot: string
  public AP: string
  public DP: string
  public agris: boolean = false
  public boosts: string
  public private: boolean = false

  //alerts
  public invalid: boolean = false
  public invalidMessage: string
  public successMessage: string
  public success: boolean = false

  //login vars
  public loggedIn: boolean
  private loggedInSub: Subscription

  //options from the game
  public classes: string[]
  public spots: string[]

  constructor(private data: CentralData, private http: HttpClient) { }

  ngOnInit(): void {
    //get centralized data
    this.classes = this.data.getClasses()
    this.spots = this.data.getSpots()
    this.loggedIn = this.data.getLoginState()

    //update login state when logged in
    this.loggedInSub = this.data.getChangesSubj().subscribe((state) => {
      this.loggedIn = state
    })

    //TODO if logged in, autofill forms using last response
  }

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe()
  }

  packageData() {
    //Package object to send with the post request for the grind session
    let sph
    if (this.gain) {
      sph = (parseInt(this.gain) / (parseInt(this.time) / 60))
    } else {
      sph = (parseInt(this.after) - parseInt(this.before)) / (parseInt(this.time) / 60)
    }
    sph = Math.floor(sph)

    let dt = new Date()
    let dtString = dt.getFullYear() + '/' +
      (dt.getMonth() < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth())
      + '/' + (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate())



    let pack = {
      silverPerHour: sph,
      AP: this.AP,
      DP: this.DP,
      class: this.class,
      agris: this.agris,
      boosts: this.boosts ? this.boosts : 0,
      date: dtString,
      id: this.data.getLoginState() ? localStorage.getItem('token') : '',
      private: this.private
    }
    return pack
  }

  formSubmit() {
    //sends form to data base
    this.hideAlerts()

    //validate for no empty or negative inputs
    if (this.AP && this.DP && (this.gain || (this.before && this.after)) &&
      this.time && this.spot && this.class) {
      if (+this.AP > 0 && +this.DP > 0 && (+this.gain > 0 || (+this.before > 0 && +this.after > 0)) && +this.time > 0) {
        //validation ok

        this.http.post('https://jyuenwapi.azurewebsites.net/grind/spot/' + this.spot, this.packageData()).subscribe((res: any) => {
          // this.http.post('http://localhost:3001/grind/spot/'+ this.spot, this.packageData()).subscribe((res:any)=>{
          if (res.success) {
            //session added
            this.clear()
            this.successAlert('Grind session succesfully added!')
          } else {
            //session add failed on server side logic
            this.invalidAlert('Grind session could not be added, our servers are currently having problems')
          }
        }, () => {
          //call failed
          this.invalidAlert('Grind session could not be added, please try again.')
        })

      } else {
        //negative numbers
        this.invalidAlert('Grind session could not be added, negative values are not allowed')
      }
    } else {
      //non valid inputs
      this.invalidAlert('Grind session could not be added, please check that all required inputs were entered and try again.')
    }



  }

  hideAlerts() {
    this.invalid = false
    this.success = false
  }

  successAlert(message: string) {
    this.success = true
    this.successMessage = message
  }

  invalidAlert(message: string) {
    this.invalid = true
    this.invalidMessage = message
  }

  swapGain() {
    //use delta silver for calculations
    this.after = ''
    this.before = ''
  }

  swapBF() {
    //use net gain for s/h calculations
    this.gain = ''
  }

  clear() {
    //clear form
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
