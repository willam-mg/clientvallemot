import { Component } from '@angular/core';
import { SeoService } from './seo.service';
import { Meta } from '@angular/platform-browser';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pmadmin';  

  constructor(private loginService:LoginService){

  }

  // ngOnInit() {
  //   this.onesignalStart();
  // }

  // onesignalStart(){
  //   var OneSignal = window['OneSignal'] || [];
  //   OneSignal.push(["init", {
  //     appId: "c7c1cfea-0f28-4d29-a622-512183e410f0",
  //     autoRegister: false,
  //     allowLocalhostAsSecureOrigin: true,
  //     notifyButton: {
  //       enable: false
  //     }
  //   }]);


  //   // console.log('OneSignal Initialized');
  //   OneSignal.push(function () {
  //     // console.log('Register For Push');
  //     OneSignal.push(["registerForPushNotifications"])
  //   });
  //   OneSignal.push(function () {
  //     // Occurs when the user's subscription changes to a new value.
  //     OneSignal.on('subscriptionChange', function (isSubscribed) {
  //       console.log("The user's subscription state is now:", isSubscribed);
  //       OneSignal.getUserId().then(function (userId) {
  //         console.log("User ID is", userId);
  //         this.loginService.setPlayerId(userId);
  //       });
  //     });
  //   });
  // }
}
