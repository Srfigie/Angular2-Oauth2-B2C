/// <reference path="../../../../typings/tsd.d.ts" /> 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import * as hello from "hellojs";
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

    /*
        START OF CONFIG AREA
        Configure these private members to be specific to the B2C Enviornment
    */
    private tennantName = "samtestb2c.onmicrosoft.com";
    private signInPolicyName = "B2C_1_SiIn";
    private signInSignUpPolicyName = "B2C_1_SiSup";
    private editProfileName = "B2C_1_pePolicy";
    private clientId = "1ef086a2-9e8b-45cf-8e0f-8ed59fbc6e6c";
    private tennantId = "9e3eb95a-740b-4ae7-a04d-dcbbe64cdf0a"
    //private redirectUri = "http://localhost:32404/b2csample";
    private redirectUri = "https://b2cOauth2-client.azurewebsites.net/b2csample"; 
    /*
        END OF CONFIG AREA
    */

    public policies = {
        signIn: this.signInPolicyName,
        signInSignUp: this.signInSignUpPolicyName,
        editProfile: this.editProfileName
    };

    constructor(private oauthService: OAuthService) {
        this.initOAuthService(this.policies.signInSignUp);
    }

    public LogIn = function (policyName) {
        this.initOAuthService(policyName);
        this.oauthService.initImplicitFlow();
    }

    public LogOut = function (policyName) {
        this.initOAuthService(policyName);
        this.oauthService.logOut();
    }

    public getAccessToken() {
        return this.oauthService.getAccessToken();
    }

    public getIdentityClaims() {
        return this.oauthService.getIdentityClaims();
    }

    public validAccessToken() {
        return this.oauthService.hasValidAccessToken();
    }

    private initOAuthService(policyName) {
        this.oauthService.clientId = this.clientId;
        this.oauthService.redirectUri = this.redirectUri;
        this.oauthService.loginUrl = "https://login.microsoftonline.com/tfp/" + this.tennantName + "/" + policyName + "/oauth2/v2.0/authorize";
        this.oauthService.logoutUrl = "https://login.microsoftonline.com/" + this.tennantName + "/oauth2/v2.0/logout?p=" + policyName + "&post_logout_redirect_uri=" + this.redirectUri;
        this.oauthService.oidc = true;
        this.oauthService.issuer = "https://login.microsoftonline.com/" + this.tennantId + "/v2.0/";
        this.oauthService.scope = "openid " + this.clientId + " offline_access";
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});
    }

}