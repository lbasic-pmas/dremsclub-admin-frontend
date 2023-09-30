import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutes } from './pages.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatListModule } from '@angular/material/list';
import { MatIconComponent } from './material-icons/mat-icon.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { HelperComponent } from './helper-classes/helper.component';
import { MaxlengthPipe } from '../pipes/maxlength.pipe';

import { CompGoogleMapsComponent } from '../components/comp-google-maps/comp-google-maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DreamsPagesComponent } from './dreams-pages/dreams-pages.component';

import { DreamsPagesAddComponent } from './dreams-pages-add/dreams-pages-add.component';
import { ElementsModule } from '../elements/elements.module';
import { ProfileComponent } from './profile/profile.component';
import { ConfigComponent } from './config/config.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DragDropModule,
    ElementsModule,
  ],
  declarations: [
    MatIconComponent,
    TimelineComponent,
    InvoiceComponent,
    PricingComponent,
    HelperComponent,
    MaxlengthPipe,
    CompGoogleMapsComponent,
    DashboardComponent,
    DreamsPagesComponent,
    DreamsPagesAddComponent,
    ProfileComponent,
    ConfigComponent,
  ],
})
export class PagesModule {}
