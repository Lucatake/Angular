import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { PocAsyncComponent } from './components/poc-async.component';
import { PocComponent } from './components/poc.component';
import { PocTakeComponent } from './components/poc-take.component';
import { PocTakeUntilComponent } from './components/poc-take-until.component';
import { PocUnsubComponent } from './components/poc-unsub.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';


@NgModule({
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ],
  declarations: [
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    PocBaseComponent,
    UnsubscribePocComponent
  ]
})
export class UnsubscribeRxjsModule {}
