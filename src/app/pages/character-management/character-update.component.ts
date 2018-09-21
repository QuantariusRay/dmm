import {
  Component,
  OnInit,
  ViewChild
}                           from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character }        from '../../interfaces/character';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
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

  public character$: Observable<Character>;
  public classes: any = [];
  public classDetails: any = {};
  public characterForm: FormGroup;

  public characterKey: string;
  public character: Character;
  private isNewCharacter: boolean;

  constructor(public characterService: CharacterService,
              public classService: ClassService,
              public activatedRoute: ActivatedRoute,
              public fb: FormBuilder) {

    this.character = {
      name: '',
      classes: [
        {
          class: '',
          classLevel: '',
        }
      ],
      race: '',
      home: '',
      theme: '',
      size: '',
      gender: '',
      speed: '',
      alignment: '',
      deity: '',
    };

    this.characterForm = this.fb.group({
      name: new FormControl(''),
      classes: new FormArray([
        new FormGroup({
          class: new FormControl('', Validators.required),
          classLevel: new FormControl('', Validators.required)
        }),
        new FormGroup({
          class: new FormControl('', Validators.required),
          classLevel: new FormControl('', Validators.required)
        }),
      ]),
      race: new FormControl(''),
      theme: new FormControl(''),
      home: new FormControl(''),
      size: new FormControl(''),
      gender: new FormControl(''),
      speed: new FormControl(''),
      alignment: new FormControl(''),
      deity: new FormControl('')
    });

  }

  ngOnInit() {
    this.characterKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCharacter = this.characterKey === 'new';
    !this.isNewCharacter ? this.getCharacter() : this.character$ = {} as Observable<Character>;

    this.getClasses();
  }

  public getCharacter() {
    this.character$ = this.characterService.getCharacter(this.characterKey).valueChanges();
    this.character$.subscribe((character) => {
      this.character = character;
      this.characterForm.patchValue(this.character);
    });
  }

  public getClasses() {

    this.classService.getClasses().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(classes => {
      this.classes = classes;
      this.classes.forEach((value) => {
        this.classDetails[value.key] = value;
      });
    });
  }

  public submitCharacter() {
    if (this.isNewCharacter) {
      this.saveCharacter();
    } else {
      this.updateCharacter();
    }
  }

  public updateCharacter() {
    this.characterService.updateCharacter(this.characterKey, this.characterForm.value);
  }

  public saveCharacter() {
    this.characterService.saveCharacter(this.characterForm.value);
  }

}
