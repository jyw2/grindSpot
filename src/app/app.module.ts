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
import { RankingElementComponent } from '.ranking/ranking-element/ranking-element.component';

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
    RankingElementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
