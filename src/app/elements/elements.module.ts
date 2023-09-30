import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementSliderComponent } from './element-slider/element-slider.component';
import { ElementLogoComponent } from './element-logo/element-logo.component';
import { ElementSocialMediaComponent } from './element-social-media/element-social-media.component';
import { ElementSectionComponent } from './element-section/element-section.component';
import { ElementMenuHeaderComponent } from './element-menu-header/element-menu-header.component';
import { ElementMenuButtonsComponent } from './element-menu-buttons/element-menu-buttons.component';

import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ComponentSliderItemComponent } from './component-slider-item/component-slider-item.component';
import { ComponentSocialMediaComponent } from './component-social-media/component-social-media.component';
import { QuillModule } from 'ngx-quill';
import { ElementArticleComponent } from './element-article/element-article.component';
import { ElementCardsComponent } from './element-cards/element-cards.component';
import { ComponentCardsComponent } from './component-cards/component-cards.component';
import { ElementFeaturedComponent } from './element-featured/element-featured.component';
import { ComponentFeaturedComponent } from './component-featured/component-featured.component'


@NgModule({
  declarations: [
    ElementSliderComponent,
    ElementLogoComponent,
    ElementSocialMediaComponent,
    ElementSectionComponent,
    ElementMenuHeaderComponent,
    ElementMenuButtonsComponent,
    ComponentSliderItemComponent,
    ComponentSocialMediaComponent,
    ElementArticleComponent,
    ElementCardsComponent,
    ComponentCardsComponent,
    ElementFeaturedComponent,
    ComponentFeaturedComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DragDropModule,
    NgxMatColorPickerModule,
    QuillModule.forRoot()
  ],
  exports: [
    ElementSliderComponent,
    ElementLogoComponent,
    ElementSocialMediaComponent,
    ElementSectionComponent,
    ElementMenuHeaderComponent,
    ElementMenuButtonsComponent,
    ComponentSliderItemComponent,
    ComponentSocialMediaComponent,
    ElementArticleComponent,
    ElementCardsComponent,
    ComponentCardsComponent,
    ElementFeaturedComponent,
    ComponentFeaturedComponent
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class ElementsModule { }
