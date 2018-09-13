import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatTable,
} from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
}                   from '@angular/animations';


export interface Participant extends Element {
  characterName: string;
  initiative: number;
  initiativeBonus: string;
  conditions?: string[];
}

@Component({
  selector: 'app-combat-tracker',
  templateUrl: './combat-tracker.component.html',
  styleUrls: ['./combat-tracker.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('20ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})
export class CombatTrackerComponent implements OnInit {

  public characterForm: FormGroup;
  public characters: Participant[] = [];
  public expandedCharacter: Participant;
  public displayedColumns: string[] = [
    'position',
    'name',
    'initiative',
    'initiative bonus',
    'conditions',
    'delete'
  ];

  @ViewChild('table') table: MatTable<Element>;

  constructor(private formBuild: FormBuilder,
              private _cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.characterForm = this.formBuild.group({
      characterName: ['', Validators.required],
      initiativeBonus: [0, Validators.required],
      initiative: [0],
    });
  }

  public stopPropagation(e: Event) {
    e.stopPropagation();
  }

  public removeParticipant(character) {
    this.characters = this.characters.filter((c) => {
      return c.characterName !== character.characterName;
    });
  }

  public removeCondition(character, condition) {
    condition.active = false;
    character.conditions = character.conditions.filter((obj) => {
      return obj.label !== condition.label;
    });
  }

  public prevTurn() {
    const actedCharacter = this.characters.pop();
    this.characters.unshift(actedCharacter);
    this.table.renderRows();
  }

  public rollInitiative() {
    this.characters.forEach((character) => {
      const initiative = (Math.floor(Math.random() * 20) + 1 + parseInt(character.initiativeBonus, 10));

      character = Object.assign(character, {initiative: initiative});
    });

    this.characters.sort((a, b) => {
      if (a.initiative !== b.initiative) {
        return b.initiative - a.initiative;
      } else {
        return parseInt(b.initiativeBonus, 10) - parseInt(a.initiativeBonus, 10);
      }
    });

    this.table.renderRows();
  }

  public nextTurn() {
    const actedCharacter = this.characters.shift();

    if (actedCharacter.conditions['delayed']) {
      this.characters.unshift(actedCharacter);
    } else {
      this.characters.push(actedCharacter);
      this.table.renderRows();
    }
  }

  public addCharacter() {
    this.characters.push(this.characterForm.value);

    this.characters.sort((a, b) => {
      if (a.initiative !== b.initiative) {
        return b.initiative - a.initiative;
      } else {
        return parseInt(b.initiativeBonus, 10) - parseInt(a.initiativeBonus, 10);
      }
    });

    this.table.renderRows();
    this._cd.detectChanges();
    this.characterForm.reset({
      initiative: 0,
      initiativeBonus: 0
    });
  }

}
