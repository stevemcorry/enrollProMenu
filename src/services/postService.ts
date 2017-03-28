import { Injectable }     from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService{
    constructor(private http: Http, public storage: Storage) {}

    requestOAuth(user) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post('http://api.enroll.pro/oauth/token', user, headers)
        .map((res) => res.json());
    }
    store(user, name){
        this.storage.set('token', user.access_token).then(() => {
            this.storage.set('name', name).then(()=>{
            console.log('Token has been set', user.access_token);
            })
        });
    }
    addContact(key, contact){
        console.log(contact, 'post', contact.first_name, contact.tags)
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post('http://api.enroll.pro/api/contacts', contact, { headers: authHeader});
    }
    addAction(key, action){
        action.due_date = action.due_date.slice(0,10);
        console.log(action, key);
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post('http://api.enroll.pro/api/actions', action, { headers: authHeader});
    }

}