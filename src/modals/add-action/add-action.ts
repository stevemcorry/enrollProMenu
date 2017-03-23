import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { Platform, ViewController, Events, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-add-action',
  templateUrl: 'add-action.html',
  providers: [ GetService, PostService ]

})
export class AddAction implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public getService: GetService, public postService: PostService, public events: Events, public alertCtrl: AlertController){ }
    action;
    actionType:any = "What do you want to do?";
    newAction = {
        action_type: "",
        contact: "",
        due_date: new Date().toISOString(),
        notes: ""
    };
    contacts;
    getContacts(){
        this.getService.getStorage().then(key => {
            this.getService.getContacts(key).subscribe((res)=>{
                this.contacts = res;
            })
        })
    }
    checkActionType(){
        if(this.actionType == 1){
            this.actionType = 'Email';
        } else if(this.actionType == 2){
            this.actionType = 'Text';
        } else if(this.actionType == 3){
            this.actionType = 'Call';
        }
    }
    log(x){
        console.log(this.newAction)
    }
    addAction(){
        if(this.newAction.due_date && this.newAction.notes && this.newAction.action_type && this.newAction.contact){
            this.getService.getStorage().then(key => {
                this.postService.addAction(key, this.newAction).subscribe((res) => {
                    this.events.publish('actionAdded');
                    this.dismiss();
                });
            })
        } else {
            let alert = this.alertCtrl.create();
            alert.setTitle('Please Enter All Info')
            alert.addButton('Cancel');
            alert.present();
        }
    }
    // presentAlert() {
    //     let alert = this.alertCtrl.create();
    //     alert.setTitle('Choose Action')
    //     alert.addInput({
    //         type: 'radio',
    //         label: 'Email',
    //         value: '1',
    //         checked: true
    //     });
    //     alert.addInput({
    //         type: 'radio',
    //         label: 'Text',
    //         value: '2'
    //     });
    //     alert.addButton('Cancel');
    //     alert.addButton({
    //         text: 'Ok',
    //         handler: data => {
    //             this.actionType = data;
    //             this.newAction.action_type = data;
    //             this.checkActionType();
    //         }
    //     });
    //     alert.present();
    // }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnInit(){
        this.getContacts();
    }
    
}