import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { PublicRoutingModule } from './public-routing.module';

//components
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
