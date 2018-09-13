import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppComponent }            from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule }       from 'angularfire2';
import { AngularFireAuthModule }       from 'angularfire2/auth';
import { AngularFireDatabaseModule }       from 'angularfire2/database';
import { NavigationComponent }     from './components/navigation/navigation.component';
import { LayoutModule }            from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatCardModule,
  MatTabsModule,
  MatSelectModule
} from '@angular/material';
import { AppRoutingModule }        from './app-routing.module';
import { SecondPageComponent }     from './pages/second-page/second-page.component';
import { CharacterManagerComponent }      from './pages/character-management/character-manager.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { HomePageComponent }      from './pages/home-page/home-page.component';
import { ConditionsComponent }    from './components/conditions/conditions.component';
import { MarkdownModule }         from 'ngx-markdown';
import { HttpClientModule }       from '@angular/common/http';
import { CommonModule }                 from '@angular/common';
import { CombatTrackerComponent }   from './pages/combat-manager/combat-tracker.component';
import { LoginPageComponent }       from './pages/login-page/login-page.component';
import { AuthService }              from './services/auth.service';
import { GoogleButtonComponent }    from './components/google-button/google-button.component';
import { CharacterService }         from './services/character.service';
import { CharacterUpdateComponent } from './pages/character-management/character-update.component';
import { ClassService }             from './services/class.service';


// Initialize Firebase
const firebaseConfig = {

};

@NgModule({
  declarations: [
    AppComponent,
    GoogleButtonComponent,
    NavigationComponent,
    CombatTrackerComponent,
    SecondPageComponent,
    CharacterManagerComponent,
    HomePageComponent,
    ConditionsComponent,
    LoginPageComponent,
    CharacterUpdateComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(firebaseConfig, 'dungeon-master-master'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    CharacterService,
    ClassService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
