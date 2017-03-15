import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PutService } from '../../services/putService'
import { ViewController, NavParams, Events } from 'ionic-angular';

@Component({
    selector: 'page-edit-contact',
    templateUrl: 'edit-contact.html',
    providers: [GetService, PutService]
})

export class EditContact implements OnInit {

    constructor(public viewCtrl: ViewController, public getService: GetService, public putService: PutService, public params: NavParams, public events: Events){
        this.contact = params.get('contact');
        console.log(this.contact, 'contact');
    }
    contact;
    log(){
        console.log(this.contact);
    }
    editContact(){
        let contact = {
            first_name: this.contact.first_name,
            last_name: this.contact.last_name,
            email: this.contact.email,
            phone: this.contact.phone,
            role: this.contact.role
        }
        this.getService.getStorage().then((key)=>{
            this.putService.editContact(key, this.contact.id, contact).subscribe(res =>{
                this.dismiss()
                this.events.publish('editContact');
            })
        });
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
    }
}