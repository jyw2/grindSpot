import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CentralData } from '../centralizedData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('email') email:any
  public username:string
  public password:string
  public invalid:boolean = false
  public invalidMessage:string
  public successMessage:string
  public success:boolean = false


  constructor(private http:HttpClient, private data: CentralData, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.invalid = false
    this.success = false

    //scramble credentials then send and receive token if valid
    this.http.post('  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',
    {
      email:this.username,
      password:this.password,
      returnSecureToken:true
    }).subscribe((response:any)=>{
      //signal user
      this.success = true
      this.successMessage = "Login successful! Redirecting..."

      //login found
      localStorage.setItem('token', response.idToken)
      //store time of expiration in milliseconds
      localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
      localStorage.setItem('refresh', response.refresh_token)
      //signal componenets we are authenticated
      this.data.logIn()

      setTimeout(()=>{
        //delay to allow message to be seen
       this.router.navigate(['/myGrindSpots'])
       this.invalid = false
       this.success = false
      },1000)

    },(error:any)=>{
      console.log(error)
      //Login not found
      this.invalid = true
      this.invalidMessage = 'Login failed, please check your username and or password.'
      this.username = ''
      this.password = ''

    })
  }

  register(){

    this.invalid = false
    this.success = false

    //validate
    if (this.email.valid && this.username.includes('.')){
      console.log('valid')
    }else if( this.password.length <= 8){
      this.invalid = true
      this.invalidMessage = 'Passwords must be longer than 8 characters'
      return
    }
    else{
      this.invalid = true
      this.invalidMessage = 'Please enter a valid Email.'
      return
    }

     //scramble credentials then send and receive token if valid
     this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9c62y3FMZc7CRY1kyOOBSfZ3_d29VNt4',
     {
       email:this.username,
       password:this.password,
       returnSecureToken:true
     }).subscribe((response:any)=>{
       //Valid Reg

       //signal user
       this.success = true
        this.successMessage = "Registration successful! Redirecting..."

      //save login
       localStorage.setItem('token', response.idToken)
       localStorage.setItem('refresh', response.refresh_token)
       //store time of expiration in milliseconds
       localStorage.setItem('timeout',  ((new Date()).getTime()+response.expiresIn).toString())
       this.data.logIn()

       setTimeout(()=>{
         //delay to allow message to be seen
        this.router.navigate(['/myGrindSpots'])
        this.invalid = false
        this.success = false
       },1000)


     },(error)=>{
       console.log(error)
       //Invalid Reg
       this.invalid = true
       this.invalidMessage = 'Registration failed, account may already exist.'
       this.username = ''
       this.password = ''
     })
  }

}
