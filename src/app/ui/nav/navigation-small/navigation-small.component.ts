import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navigation-small',
  templateUrl: './navigation-small.component.html',
  styleUrls: ['./navigation-small.component.scss']
})
export class NavigationSmallComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      // todo: something
    });
  }
}
