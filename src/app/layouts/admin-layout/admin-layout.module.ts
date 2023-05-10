import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

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





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ListOpportunityComponent,
    AddOpportunityComponent,
    DeleteOpportunityComponent,
    UpdateOpportunityComponent,
    ListCandidacyComponent,
    DeleteCandidacyComponent,
    AddCandidacyComponent,
    SpecialtiesStatsComponent
  ]
})

export class AdminLayoutModule {}
