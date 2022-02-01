import { UnsubscribeRxjsModule } from './unsubscribe-rxjs/unsubscribe-rxjs.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosModule } from './cursos/cursos.module';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'cursos' },
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)},
  { path: 'rxjs-poc', loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(m => m.UnsubscribeRxjsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }