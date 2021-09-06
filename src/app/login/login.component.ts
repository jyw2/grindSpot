import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentralData } from '../centralizedData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string
  public password:string
  public invalid:boolean = false
  public invalidReg:boolean = false


  constructor(private http:HttpClient, private data: CentralData, private router:Router) { }

  ngOnInit(): void {
  }

  encrypt(credential:string){
    //returns encrypted credential
    return credential
  }

  login(){
    this.invalid = false
    this.invalidReg = false
    //scramble credentials then send and receive token if valid
    this.http.post('  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',
    {
      email:this.encrypt(this.username),
      password:this.encrypt(this.password),
      returnSecureToken:true
    }).subscribe((response:any)=>{
      //login found
      localStorage.setItem('token', response.idToken)
      //store time of expiration in milliseconds
      localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
      localStorage.setItem('refresh', response.refresh_token)
      //signal componenets we are authenticated
      this.data.logIn()
      this.router.navigate(['/myGrindSpots'])
    },(error:any)=>{
      console.log(error)
      //Login not found
      this.invalid = true
      this.username = ''
      this.password = ''

    })
  }



  register(){

    console.log(this.encrypt(this.username))
    this.invalid = false
    this.invalidReg = false
     //scramble credentials then send and receive token if valid
     this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',
     {
       email:this.encrypt(this.username),
       password:this.encrypt(this.password),
       returnSecureToken:true
     }).subscribe((response:any)=>{
       //login found
       localStorage.setItem('token', response.idToken)
       localStorage.setItem('refresh', response.refresh_token)
       //store time of expiration in milliseconds
       localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
       this.data.logIn()
       this.router.navigate(['/myGrindSpots'])
     },(error)=>{
       console.log(error)
       //Login not found
       this.invalidReg = true
       this.username = ''
       this.password = ''
     })
  }

  delete(){
    //dev Only! delete after
    this.http.post('  https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',
     {
      idToken: localStorage.getItem('token')
     }).subscribe((response:any)=>{
      console.log('account deleted')
      this.data.logOut()
     },()=>{
      console.log('delete failed')
     })
  }

}
