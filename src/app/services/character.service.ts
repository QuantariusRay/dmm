import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
}                     from 'angularfire2/database';
import { Character }  from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterPath = '/characters';
  public charactersRef: AngularFireList<Character> = null;

  constructor(private db: AngularFireDatabase) {
    this.charactersRef = this.db.list(this.characterPath);
  }

  // Create
  public saveCharacter(character: Character): void {
    this.charactersRef.push(character);
  }

  // Read
  public getCharacters(): AngularFireList<Character> {
    return this.charactersRef;
  }

  public getCharacter(characterKey: string): AngularFireObject<Character> {
    return this.db.object(`characters/${characterKey}`);
  }

  // Update
  public updateCharacter(key: string, value: any): void {
    this.charactersRef.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Delete
  public deleteCharacter(key: string): void {
    this.charactersRef.remove(key)
      .catch(error => this.handleError(error));
  }

  public editCharacter(character) {
    const characterRef = this.db.object('character');
    characterRef.update(character);
  }

  private handleError(error) {
    console.log(error);
  }
}
