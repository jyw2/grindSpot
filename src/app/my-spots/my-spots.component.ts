import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentralData } from '../centralizedData.service';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-my-spots',
  templateUrl: './my-spots.component.html',
  styleUrls: ['./my-spots.component.css']
})
export class MySpotsComponent implements OnInit, AfterContentChecked {

  public loading:boolean = true
  public grindSpots:any
  constructor( private routerService: Router, private data:CentralData,
    private queryService: QueryService) { }

  ngOnInit(): void {
    this.updateSpots()
    console.log('Inited')
  }

  ngAfterContentChecked(): void{

  }

  async updateSpots(){
    //grab spots for user
    this.loading = true
    this.grindSpots = await this.queryService.userSpotsQuery(localStorage.getItem('token'))
    this.grindSpots = this.grindSpots.sort()
    console.log('updating my spots')
    this.loading = false
  }

  spotSelected(name:any){
    //Redirect to the specefic grindspot page
    this.routerService.navigate(['/spot',this.websafe(name),'user'])
  }

  websafe(name:string){
    //replaces spaces with - and ' with nothing
    name = (name as string).replace(' ','-')
    name = (name as string).replace("'","~")
    return name
  }

}


