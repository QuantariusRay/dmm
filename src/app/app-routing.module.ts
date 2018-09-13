import { NgModule }               from '@angular/core';
import {
  Routes,
  RouterModule
}                                    from '@angular/router';
import { SecondPageComponent }       from './pages/second-page/second-page.component';
import { CharacterManagerComponent } from './pages/character-management/character-manager.component';
import { HomePageComponent }         from './pages/home-page/home-page.component';
import { CombatTrackerComponent }    from './pages/combat-manager/combat-tracker.component';
import { LoginPageComponent }        from './pages/login-page/login-page.component';
import { CharacterUpdateComponent }  from './pages/character-management/character-update.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'combat-tracker',
    component: CombatTrackerComponent
  },
  {
    path: 'second-page',
    component: SecondPageComponent
  },
  {
    path: 'characters',
    component: CharacterManagerComponent,
  },
  {
    path: 'character/:id',
    component: CharacterUpdateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
