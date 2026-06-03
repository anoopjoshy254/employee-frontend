import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Home } from './pages/home/home';
import { AddEmployee } from './component/add-employee/add-employee';
import { ViewEmployee } from './component/view-employee/view-employee';
import { EditEmployee } from './component/edit-employee/edit-employee';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'add-employee', component: AddEmployee },
  { path: 'view-employee', component: ViewEmployee },
  { path: 'edit-employee/:id', component: EditEmployee },
  { path: '**', redirectTo: '/login' }
];
