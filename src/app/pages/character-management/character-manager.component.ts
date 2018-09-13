import { Component, OnInit } from '@angular/core';
import { CharacterService }  from '../../services/character.service';
import {
  AngularFireList,
  AngularFireObject
}                            from 'angularfire2/database';
import { Character }         from '../../character';
import { Observable }        from 'rxjs/index';
import { map }               from 'rxjs/internal/operators';

@Component({
  selector: 'app-character-manager',
  templateUrl: './character-manager.component.html',
  styleUrls: ['./character-manager.component.scss']
})
export class CharacterManagerComponent implements OnInit {

  public characters: Character[];

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.getCharactersList();
  }

  public getCharactersList() {
    this.characterService.getCharacters().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

}
