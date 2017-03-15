import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { ViewController, Events } from 'ionic-angular';

@Component({
    selector: 'page-edit-goals',
    templateUrl: 'edit-goals.html',
    providers: [GetService]
})

export class EditGoals implements OnInit {

    constructor(public viewCtrl: ViewController,public events: Events, public getService: GetService){}
    goals = [];
    getGoalTotals(){
        this.goals = [];
        this.getService.getStorage().then(key => {
            this.getService.getContactPosition(key).subscribe(res => {
                res.filter(x => {
                    let obj = {
                        name: x.name,
                        amount: x.contacts.length
                    }
                    this.goals.push(obj);
                })
            });
        })
    }
    setWidth(x){
        return (x*10)+'%';
    }
    dismiss(){
        console.log('click')
        this.viewCtrl.dismiss();
    }

    ngOnInit(){
        this.getGoalTotals()
    }
}