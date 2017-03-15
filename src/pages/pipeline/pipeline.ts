import { Component, OnInit } from '@angular/core';
import { NavController, Slides, ModalController, Events } from 'ionic-angular';
import  { GetService } from '../../services/getService';
import { ViewChild, style, animate, transition, trigger } from '@angular/core';
import { SpecificProspect } from '../../modals/specific-prospect/specific-prospect';
import { AddContact } from '../../modals/add-contact/add-contact';
import { PipelineChoose } from '../../modals/pipeline-choose/pipeline-choose';

@Component({
  selector: 'page-pipeline',
  templateUrl: 'pipeline.html',
  providers: [GetService],
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(200, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(200, style({opacity:0})) 
    ])
  ])
]
})
export class Pipeline implements OnInit {

  @ViewChild('pipeSlider') pipeSlider: Slides;

  goToSlide(x) {
    this.pipeSlider.slideTo(x, 500);
  }
  slideChange(){
    console.log(this.pipeSlider._activeIndex);
    if(this.pipeSlider._activeIndex <= 2){
      this.title = 'Names List'
    } else if(this.pipeSlider._activeIndex > 2 && this.pipeSlider._activeIndex <= 6){
      this.title = 'Enrollment'
    } else if (this.pipeSlider._activeIndex > 6){
      this.title = 'Customer'
    }
  }
  constructor(public nav: NavController, public modalCtrl: ModalController, private getService: GetService, public events: Events) {
    this.events.subscribe('pipeSelect', () =>{
      this.getPipelinePositions();
    })
    this.events.subscribe('contactAdded', () => {
      this.getPipelinePositions();
    })
    this.events.subscribe('pipeAdvance', () => {
      this.getPipelinePositions();
      this.getContactPosition();
    })
    this.events.subscribe('editContact', () => {
      this.getPipelinePositions()
    });
    this.events.subscribe('leadsPipe', () =>{
      this.leadsPipe();
    })
    this.events.subscribe('enrollmentsPipe', () =>{
      this.enrollmentsPipe();
    })
    this.events.subscribe('customerPipe', () =>{
      this.customerPipe();
    })
    this.events.subscribe('builderPipe', () =>{
      this.builderPipe();
    })
  }

  public pipelineSteps;
  public title = 'Names List';
  public slides = [
    {name: "Imported Contacts"}
  ];
  public something;
  public prospects = [];
  public allProspects;
  public pipelineFilter = [];
  public obj;
  dotColor(prosp){
    if(prosp == 0) {
      return "#ACD373";
    } else if(prosp == 1) {
      return "#959595";
    } else {
      return "#E55F61"
    }
  }
  slidesSet(){
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
        if(this.slides.indexOf(x) === -1) {
        if (x.name) {
          this.getContactPosition();
          this.goToSlide(0);
          let z = x.contacts.length;
          let obj = {
            contacts: x.contacts,
            id: x.id,
            name: x.name,
            number: z
          }
          this.slides.push(obj);
        }
      }
    })
  }
  leadsPipe(){
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
        if(this.slides.indexOf(x) === -1) {
        if (x.name) {
          this.getContactPosition();
          this.goToSlide(0);
          let z = x.contacts.length;
          let obj = {
            contacts: x.contacts,
            id: x.id,
            name: x.name,
            number: z
          }
          this.slides.push(obj);
        }
      }
    })
    this.title = 'Names List';
  }
  enrollmentsPipe = () => {
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
      if(this.slides.indexOf(x) === -1){
        if( x.name) {
          this.getContactPosition();
          this.goToSlide(3);
          let z = x.contacts.length;
          let obj = {
            contacts: x.contacts,
            id: x.id,
            name: x.name,
            number: z
          }
          this.slides.push(obj);
        }
      }
    })
    this.title = 'Enrollment';
  }
  customerPipe = () => {
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
      if(this.slides.indexOf(x) === -1){
        if( x.name) {
          this.getContactPosition();
          this.goToSlide(7)
          let z = x.contacts.length;
          let obj = {
            contacts: x.contacts,
            id: x.id,
            name: x.name,
            number: z
          }
          this.slides.push(obj);
        }
      }
    })
    this.title = 'Customers';
  }
  builderPipe = () => {
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
      if(this.slides.indexOf(x) === -1){
        if( x.name) {
          this.getContactPosition();
          this.goToSlide(10)
          let z = x.contacts.length;
          let obj = {
            contacts: x.contacts,
            id: x.id,
            name: x.name,
            number: z
          }
          this.slides.push(obj);
        }
      }
    })
    this.title = 'Builders';
  }
  openModal(prospect) {
    let pipeChange = this.pipelineSteps.filter(val => {
      return (val.id && val.name)
    })
    this.nav.push(SpecificProspect, {prospect: prospect, slides: pipeChange});
  }
  openAddModal() {
    let modal = this.modalCtrl.create(AddContact);
    modal.present();
  }
  pipelineChoose(){
    let modal = this.modalCtrl.create(PipelineChoose);
    modal.present();
  }
  getPipelinePositions = () => {
    this.getService.getStorage().then(key => {
      this.getService.getPipelinePositions(key).subscribe(res => {
        this.pipelineSteps = res;
        this.slidesSet();
      });
    })
  }
  getContactPosition(){
    this.getService.getStorage().then(key => {
      this.getService.getContactPosition(key).subscribe(res => {
        this.pipelineFilter = [];
        this.prospects = [];
        for(var i = 0; i < res.length; i++){
          for(var x = 0 ; x < res[i].contacts.length; x++){
            let id = res[i].id;
            this.obj = {
              id: id,
              contact: res[i].contacts[x]
            }
            if(this.pipelineFilter.indexOf(this.obj) === -1){
              this.pipelineFilter.push(this.obj);
              this.prospects.push(this.obj);
            }
          }
        } return true;
      });
    })
  }
  

  ngOnInit() {
    this.getPipelinePositions();
  }

}