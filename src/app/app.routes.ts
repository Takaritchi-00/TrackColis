import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Authentification } from './authentification/authentification';
import { Login } from './authentification/login/login';
import { Signup } from './authentification/signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { authentificationGuard } from './authentification-guard';

export const routes: Routes = [
    {
        path: '', component: Welcome
    },
    {
        path: 'auth', component: Authentification,
        children: [
            { path: 'login', component: Login },
            { path: 'signup', component: Signup },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    },
    {
        path: 'dashboard', component: Dashboard, 
        canActivate: [authentificationGuard],
    },
];
