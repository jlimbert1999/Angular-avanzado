import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '935296079207-e0l4k3tpdagnd72ja0toualhamghm23h.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.log('error desde module', err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AuthModule { }
