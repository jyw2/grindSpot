import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CentralData } from '../centralizedData.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  //defaults
  public before:number
  public after:number
  public gain:number
  public time:number
  public class:string = 'default'
  @Input()public spot:string = 'default'//accesed on grindspot pages
  public AP:number
  public DP:number
  public agris:any
  public boosts:number = 0


  public classes:string[]
  public spots:string[]

  constructor(private data:CentralData, private http:HttpClient ) { }

  ngOnInit(): void {
    this.classes = this.data.getClasses()
    this.spots = this.data.getSpots()

    //if logged in, autofill using last response
    //if on a grindspot page, auto fill the grindSpot
  }

  packageData(){
    let sph
    if(this.gain){
      sph = this.gain/(this.time/60)
    }else{
      sph = (this.after-this.before)/(this.time/60)
    }

    let ag
    if( this.agris === 'yes'){
      ag = 'yes'
    }else{
      ag = 'no'
    }

    let pack = {
      silverPerHour: sph, 
      AP: this.AP,
      DP: this.DP,
      class: this.class,
      agris: ag,
      boosts: this.boosts
    }

    return pack
  }

  formSubmit(){
    //sends form to data base
      this.http.post('https://api.jyuenw.com/grind', this.packageData()).subscribe(()=>{

      })
    //if logged in include ID

    //else leave anonymous

  }
}
