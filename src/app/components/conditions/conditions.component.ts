import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Participant }      from '../../pages/combat-manager/combat-tracker.component';
import { Observable }       from 'rxjs/index';
import {
  HttpClient,
} from '@angular/common/http';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnChanges, OnInit {

  @Input() participant: Participant;

  public icons;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(
      (data) => {
        this.icons = data.icons;
      },
        (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  private getJSON(): Observable<any> {
    return this.http.get('./../assets/icons.json');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.participant);
  }

  public applyCondition(condition) {
    condition.active = true;

    if (this.participant && this.participant.conditions) {
      this.participant.conditions.push(condition);
    } else {
      this.participant.conditions = [];
      this.participant.conditions.push(condition);
    }

  }

}
