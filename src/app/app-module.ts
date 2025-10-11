import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './Pages/login/login';
import { System } from './Pages/system/system';
import { Home } from './Pages/system/home/home';
import { Rating } from './Pages/system/rating/rating';
import { Profile } from './Pages/system/profile/profile';
import { Navbar } from './Pages/system/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Shop } from './Pages/system/shop/shop';

@NgModule({
  declarations: [
    App,
    Login,
    System,
    Home,
    Rating,
    Profile,
    Navbar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Shop,
    BrowserAnimationsModule, 
    RouterModule.forRoot([
      { path: '', redirectTo: '/system/home', pathMatch: 'full' },
      { path: 'system', component: System, children: [
        { path: 'home', component: Home },
        { path: 'profile', component: Profile },
        { path: 'rating', component: Rating },
      ]},
      { path: '**', redirectTo: '/system/home' }
    ])
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }