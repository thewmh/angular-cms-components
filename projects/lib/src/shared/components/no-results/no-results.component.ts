import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cms-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit {
  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
