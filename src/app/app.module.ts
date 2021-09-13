import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { GrindSpotComponent } from './grind-spot/grind-spot.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { LoginComponent } from './login/login.component';
import { Routes,RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { MySpotsComponent } from './my-spots/my-spots.component'
import { AuthGuard } from './routeGuard.service';

const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'spot/:spot', component: GrindSpotComponent},
  {path: 'spot/:spot/:state', component: GrindSpotComponent,canActivate: [AuthGuard]},
  {path: 'add', component: FormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:misc', redirectTo: 'login'},
  {path: 'register', component: LoginComponent},
  {path: 'myGrindSpots', component: MySpotsComponent, canActivate: [AuthGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GrindSpotComponent,
    GraphsComponent,
    AddSessionComponent,
    LoginComponent,
    FormComponent,
    MySpotsComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
