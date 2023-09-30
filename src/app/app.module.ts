import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe , registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
registerLocaleData( localeEs, 'es-CL') ;

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { mailService, mailGlobalVariable } from './apps/mailbox/mail.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CompVersionComponent } from './components/comp-version/comp-version.component';
import { PartnerAddComponent } from './dialog/partner/partner-add/partner-add.component';
import { PartnerEditComponent } from './dialog/partner/partner-edit/partner-edit.component';
import { ExperienceImageComponent } from './dialog/experience-image/experience-image.component';


import { ImageCropperModule } from 'ngx-image-cropper';
import { AccountAddComponent } from './dialog/bankAccount/account-add/account-add.component';
import { AccountEditComponent } from './dialog/bankAccount/account-edit/account-edit.component';
import { NotAvailableAddComponent } from './dialog/dates/not-available-add/not-available-add.component';
import { DatePriceAddComponent } from './dialog/dates/date-price-add/date-price-add.component';
import { PartnerAvatarComponent } from './dialog/partner/partner-avatar/partner-avatar.component';
import { ChangeStateTrypoComponent } from './dialog/change-state-trypo/change-state-trypo.component';
import { RangeDateBookComponent } from './dialog/range-date-book/range-date-book.component';
import { PartnerSuscriptionComponent } from './dialog/partner/partner-suscription/partner-suscription.component';
import { PartnerRenewComponent } from './dialog/partner/partner-renew/partner-renew.component';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { QuillModule } from 'ngx-quill'

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    VerticalAppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    VerticalAppSidebarComponent,
    AppBreadcrumbComponent,
    HorizontalAppHeaderComponent,
    HorizontalAppSidebarComponent,
    CompVersionComponent,
    PartnerAddComponent,
    PartnerEditComponent,
    ExperienceImageComponent,
    AccountAddComponent,
    AccountEditComponent,
    NotAvailableAddComponent,
    DatePriceAddComponent,
    PartnerAvatarComponent,
    ChangeStateTrypoComponent,
    RangeDateBookComponent,
    PartnerSuscriptionComponent,
    PartnerRenewComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule, 
    ReactiveFormsModule ,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ImageCropperModule,
    NgxMatColorPickerModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' } ,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    mailService,
    mailGlobalVariable,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
