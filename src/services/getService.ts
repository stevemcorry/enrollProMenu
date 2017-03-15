import { Injectable, OnInit }     from '@angular/core';
import {Storage} from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetService implements OnInit{

    constructor(private http: Http, private storage: Storage) {}
    getSpecificContact(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/contacts/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getMarkets(){
        return this.http.get('/assets/market.json')
        .map( res => {
            return res.json();
        })
    }
    getContactPosition(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/pipelines', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getPipelinePositions(key){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/pipelines', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getContacts(key){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/contacts', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificActions(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/actions/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getActions(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/actions', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getStorage(){
            return (this.storage.get('token').then((name) => {
            return name;
            }))
    }
    getStorageName(){
            return (this.storage.get('name').then((name) => {
            return name;
            }))
    }
    getJobs(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/jobs', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificTemplate(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/jobs/templates/' + id , {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificJobs(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://enrollpro.coopertechnology.com/api/jobs/' + id , {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getGoals(key){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get('http://api.enroll.pro/api/goals', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    ngOnInit(){
    }
}