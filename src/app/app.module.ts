import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { GrindSpotComponent } from './grind-spot/grind-spot.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserGrindSpotComponent } from './user-grind-spot/user-grind-spot.component';
import { Routes,RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component'

const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'spot/:spot', component: GrindSpotComponent},
  {path: 'add', component: FormComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RankingComponent,
    GrindSpotComponent,
    GraphsComponent,
    AddSessionComponent,
    LoginComponent,
    SignUpComponent,
    UserGrindSpotComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
