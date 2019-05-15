import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './views/homepage/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
