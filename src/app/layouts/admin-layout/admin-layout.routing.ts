import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListOpportunityComponent } from '../../opportunity/list-opportunity/list-opportunity.component';
import { AddOpportunityComponent } from '../../opportunity/add-opportunity/add-opportunity.component';
import { DeleteOpportunityComponent } from '../../opportunity/delete-opportunity/delete-opportunity.component';
import { UpdateOpportunityComponent } from '../../opportunity/update-opportunity/update-opportunity.component';
import { ListCandidacyComponent } from '../../candidacy/list-candidacy/list-candidacy.component';
import { DeleteCandidacyComponent } from '../../candidacy/delete-candidacy/delete-candidacy.component';
import { AddCandidacyComponent } from '../../candidacy/add-candidacy/add-candidacy.component';
import { SpecialtiesStatsComponent } from '../../opportunity/specialties-stats/specialties-stats.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'list_opportunity',        component: ListOpportunityComponent },
    { path: 'add_opportunity',        component: AddOpportunityComponent },
    { path: 'delete_opportunity/:idOpportunity',component:DeleteOpportunityComponent},
    { path: 'update_opportunity/:idOpportunity',component:UpdateOpportunityComponent},
    { path: 'list_candidacy',        component: ListCandidacyComponent },
    { path: 'delete_candidacy/:idCandidacy',component:DeleteCandidacyComponent},
    { path: 'add_candidacy',        component: AddCandidacyComponent },
    { path: 'stat',        component: SpecialtiesStatsComponent },
    
];
