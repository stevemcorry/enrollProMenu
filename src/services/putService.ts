import { Injectable }     from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PutService{
    constructor(private http: Http,public storage: Storage) {}

    completeAction(key, id, action){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put('http://api.enroll.pro/api/actions/' + id, JSON.stringify(action), { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
    advancePipe(key, id, pipe){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put('http://api.enroll.pro/api/contacts/' + id, JSON.stringify(pipe), { headers: authHeader}).
        map(res => {
            console.log(res, 'put pipe');
        });
    }
    editContact(key, id, edit){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put('http://api.enroll.pro/api/contacts/' + id, edit, { headers: authHeader}).
        map(res => {
        });
    }
    updateTags(key, id, x){
        let tags = {
            tags: x
        }
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put('http://api.enroll.pro/api/contacts/' + id, tags, { headers: authHeader}).
        map(res => {});
    }

}