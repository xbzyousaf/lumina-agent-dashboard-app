import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CallersComponent } from 'app/callers/callers.component';
import { DashboradTicketFormComponent } from 'app/dashboard/dashborad-ticket-form/dashborad-ticket-form.component';
import { CallerInfoComponent } from 'app/callers/caller-info/caller-info.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'callers-list',     component: CallersComponent },
    { path: 'tickets/:id/edit',     component: DashboradTicketFormComponent },
    { path: 'callers/:id/details',     component: CallerInfoComponent },


];
