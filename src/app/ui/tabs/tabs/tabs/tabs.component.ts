import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
    tabs: TabComponent[] = [];
    @Output() selectedTab: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

    addTab(tab: TabComponent) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }

    selectTab(tab: TabComponent) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true;
        this.selectedTab.emit(null);
    }

}
