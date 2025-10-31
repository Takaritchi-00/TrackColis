import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Authentification } from './authentification/authentification';
import { Login } from './authentification/login/login';
import { Signup } from './authentification/signup/signup';

export const routes: Routes = [
    {
        path: '',component: Welcome
    }, 
    {
        path: 'auth',component: Authentification, 
        children: [
            { path:'login', component: Login },
            { path:'signup', component: Signup },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
          ]
    }
];
