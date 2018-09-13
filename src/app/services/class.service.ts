import { Injectable }               from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from 'angularfire2/database';
import { Character }                from '../character';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classPath = '/classes';
  public classRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.classRef = this.db.list(this.classPath);
  }

  // Read
  public getClasses(): AngularFireList<any> {
    return this.classRef;
  }

  public getClass(classKey: string): AngularFireObject<any> {
    return this.db.object(`class/${classKey}`);
  }
}
