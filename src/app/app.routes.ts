import { Routes } from '@angular/router';
import { PlansComponent } from './components/plans/plans.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AddTourComponent } from './components/admin-dashboard/add-tour/add-tour.component';
import { EditTourComponent } from './components/admin-dashboard/edit-tour/edit-tour.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'plans', component: PlansComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
    { path: 'admin/add-tour', component: AddTourComponent, canActivate: [AdminAuthGuard] },
    { path: 'admin/edit-tour/:id', component: EditTourComponent, canActivate: [AdminAuthGuard] }
];
