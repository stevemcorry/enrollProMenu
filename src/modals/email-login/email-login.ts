import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/postService';
import { GetService } from '../../services/getService';
import { Platform, NavParams, ViewController, NavController} from 'ionic-angular';
import { Actions } from '../../pages/actions/actions';

@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html',
  providers: [ PostService, GetService]
})
export class EmailLogin implements OnInit{
    fullname;
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public platform: Platform, public params: NavParams, public postService: PostService, public gettService: GetService){
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    login() {
        if(this.user.username && this.user.password && this.fullname) {
            this.token();
        }
        else {
            alert('Please Fill out all the information')
        }
    }
    public user = {
    "grant_type": "password",
    "client_id": "2",
    "client_secret": "KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2",
    "username": "",
    "password": "",
    "scope": ""
    }
    token(){
        this.postService.requestOAuth(this.user).subscribe(res=>{
            console.log(res);
            if(res){   
            this.store(res)
            this.navCtrl.setRoot(Actions);
            } else {
                alert('Incorrect login')
            }

        })
    }
    store(key){
        this.postService.store(key, this.fullname);
    }
    ngOnInit(){
    }
}