import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsumerService } from './services/consumer.service';
import { TableModule }  from 'primeng/table';
import { DialogModule }  from 'primeng/dialog';
import {InputTextModule, MultiSelectModule, GrowlModule, Growl, ContextMenuModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DataTableModule, DataGridModule, PaginatorModule, Column} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {TabPanel} from 'primeng/primeng';
import {AccordionModule, AccordionTab} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/menu';
import {SliderModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TreeModule} from 'primeng/tree';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    PaginatorModule,
    SliderModule,
    MultiSelectModule,
    GrowlModule,
    ContextMenuModule,
    TreeModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule,
    MenuModule,
    OverlayPanelModule
  ],
  providers: [
    ConsumerService,
    Http,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
