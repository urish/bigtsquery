import { Component, OnInit, Input } from '@angular/core';
import { IQueryErrorKind } from '../ast-search.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string;
  @Input() kind: IQueryErrorKind;

  constructor() {}

  ngOnInit() {}
}
