import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character }        from '../../character';
import {
  FormGroup,
  NgForm,
} from '@angular/forms';
import {
  ActivatedRoute,
}                           from '@angular/router';
import {
  AngularFireObject
}                           from 'angularfire2/database';
import { Observable }       from 'rxjs/index';
import { ClassService }     from '../../services/class.service';
import { map }              from 'rxjs/internal/operators';


@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.scss']
})
export class CharacterUpdateComponent implements OnInit {

  public characterRef: AngularFireObject<Character>;
  public character$: Observable<Character>;
  public classes: any;

  public characterKey: string;
  private isNewCharacter: boolean;

  constructor(public characterService: CharacterService,
              public classService: ClassService,
              public activatedRoute: ActivatedRoute) {

  }

  @ViewChild('characterForm') public characterForm: NgForm;

  ngOnInit() {
    this.characterKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCharacter = this.characterKey === 'new';
    !this.isNewCharacter ? this.getCharacter() : this.characterRef = {} as AngularFireObject<Character>;

    this.getClasses();
  }

  public getCharacter() {
    this.character$ = this.characterService.getCharacter(this.characterKey).valueChanges();
  }

  public getClasses() {
    this.classService.getClasses().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(classes => {
      this.classes = classes;
    });
  }

  public indexTracker(index: number, value: any) {
    return index;
  }

  public updateCharacter(character) {
    console.log(character);
    this.characterService.updateCharacter(this.characterKey, this.characterForm.form.value);
  }

}
