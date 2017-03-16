import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { PostService } from '../services/postService';
import { Actions } from '../pages/actions/actions';
import { Goals } from '../pages/goals/goals';
import { Pipeline } from '../pages/pipeline/pipeline';
import { Marketing } from '../pages/marketing/marketing';
import { More } from '../pages/more/more';
import { Messages } from '../pages/messages/messages';
import { LoginModal } from '../modals/login/login';


@Component({
  templateUrl: 'app.html',
  providers: [ PostService ]
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Actions;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public postService: PostService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Actions', component: Actions },
      { title: 'Goals', component: Goals },
      { title: 'Pipeline', component: Pipeline },
      { title: 'Marketing', component: Marketing },
      { title: 'More', component: More },
      { title: 'Messages', component: Messages },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  login(){
    let user = {
    "grant_type": "password",
    "client_id": "2",
    "client_secret": "KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2",
    "username": "tim@gmail.com",
    "password": "111111",
    "scope": ""
  }
  this.postService.requestOAuth(user).subscribe(res=>{
            console.log(res);
            if(res){   
            this.postService.store(res, "timmy");
            } else {
                alert('Incorrect login')
            }

        })
  }

  ngOnInit(){
    //this.login();
  }
}
