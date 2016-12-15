import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authService.service';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'b2csample',
    template: require('./b2csample.component.html'),
    providers: [AuthService]
})
export class B2cSampleComponent implements OnInit{

    private apiBaseURL = "https://b2cOauth2-API.azurewebsites.net";
    constructor(private http: Http, private authService: AuthService) {
        
    }

    public authMsg = "";
    public userClaims = "";
    public statusText = "";
    public validToken = this.authService.validAccessToken();
    public tasks: ApiTask[];

    public loginOrSignUp() {
        this.authMsg = "test";
        this.authService.LogIn(this.authService.policies.signInSignUp);
    }

    public logoutSignUp() {
        this.authService.LogOut(this.authService.policies.signInSignUp);
    }

    public editProfile() {
        this.authService.LogIn(this.authService.policies.editProfile);
    }

    public logoutEditProfile() {
        this.authService.LogOut(this.authService.policies.editProfile);
    }

    public login() {
        this.authService.LogIn(this.authService.policies.signIn);
    }

    public logout() {
        this.authService.LogOut(this.authService.policies.signIn);
    }

    public getClaims() {
        var claims = this.authService.getIdentityClaims();
        if (claims != null) {
            this.userClaims = "Welcome  " + claims.name + " " + claims.emails[0];
        }
        
    }

    public getTasks() {
        let authHeader = new Headers();
        this.setHeaders(authHeader);
        this.http.get(this.apiBaseURL + '/api/Tasks', {
            headers: authHeader
        }).subscribe(result => {
            this.tasks = result.json();
            this.statusText = result.statusText;
        });
    }

    public postTask() {
        var currentId = (this.tasks == undefined) ? 0 : this.tasks.length;
        var bodyObj = {
            id: (currentId == 0) ? 0 : currentId,
            text: Date.now().toString(),
        };
        let authHeader = new Headers();
        this.setHeaders(authHeader);
        this.http.post(this.apiBaseURL + '/api/Tasks', bodyObj, {
            headers: authHeader
        }).subscribe(result => {
            this.statusText = result.status.toString();
        });
    }
    
    setHeaders(headers: Headers) {
        headers.append("Authorization", "Bearer " + this.authService.getAccessToken());
    }

    ngOnInit() {
        this.authMsg = "AccessToken: " + this.authService.getAccessToken();
        this.statusText = "Valid Token: " + this.authService.validAccessToken();
        this.getClaims();
    };
}

interface ApiTask {
    Id: number;
    Owner: string;
    Text: string;
    Completed: boolean;
    DateModified: string;
}