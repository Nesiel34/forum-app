import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'register', loadComponent:()=>import('./components/register/register.component').then(c=>c.RegisterComponent)},
  { path: 'login',loadComponent:()=>import('./components/login/login.component').then(c=>c.LoginComponent) },
  { path: 'forum',loadComponent:()=>import('./components/forum/forum.component').then(c=>c.ForumComponent),canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
