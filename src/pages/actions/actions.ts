import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { NavController, ModalController, Events, FabContainer, NavParams } from 'ionic-angular';
import { PutService } from '../../services/putService';
import { AddContact } from '../../modals/add-contact/add-contact';
import { SpecificAction } from '../../modals/specific-action/specific-action';
import { ChooseActionContact } from '../../modals/choose-action-contact/choose-action-contact';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
  providers: [ GetService, PutService ]

})
export class Actions implements OnInit{
  constructor(public navCtrl: NavController, public params: NavParams, private getService: GetService, public putService: PutService, public modalCtrl: ModalController, public events: Events) {
    this.start = params.get('key');
    this.events.subscribe('actionSelect', () =>{
      this.getActions();
    })
    this.events.subscribe('actionAdded', () =>{
      this.getActions();
    })
  }
  public start;
  public actions;
  public action = {
    action_type: {
      name: ''
    },
    complete: 0,
    contact: {
      first_name: ''
    },
    due_date: '',
    id: 0,
  }
  public newAction = {
    "complete": 1
  }
  public status = true;
  showDim = false;

  getActions(){
    this.getService.getStorage().then(key => {
            this.getService.getActions(key).subscribe(res => {
              this.actions = res;
             });
        })
  }
  completeAction(id){
    this.getService.getStorage().then(key => {
      setTimeout(()=>{
        this.putService.completeAction(key, id, this.newAction).subscribe(res => {
          this.getActions();
        })
      }, 500)
    })
  }
  addContact(){
    let modal = this.modalCtrl.create(AddContact);
    modal.present();
  }
  chooseActionContact(){
    let modal = this.modalCtrl.create(ChooseActionContact);
    modal.present();
  }
  openSpecificAction(action){
    this.navCtrl.push(SpecificAction, {action: action});
  }
  statusCheck(stat){
    if(stat){
      return "lightgreen"
    } else {
      return "white"
    }
  }
  animate(id){
    if(id == true){
      return true
    } else {
      return false
    }
  }
  closeFab(fab: FabContainer): void {
    if (fab !== undefined) {
      fab.close();
    }
  }
  classCheck(x){
    let action = x.action_type.id
    if( action === 1){
      return 'email'
    } else if( action === 2){
      return 'text'
    }
  }
  flop = true;

  ngOnInit(){
      this.getActions();
  }
}
