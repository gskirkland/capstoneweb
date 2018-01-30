import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'global-session-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class GlobalSessionSearchComponent implements OnInit {
    
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    selectedTrack: string;
    advancedSearch: boolean;
    
    @Output() 
    notify: EventEmitter<Object> = new EventEmitter<Object>();
    
    constructor() {}

    ngOnInit(): void {
        this.searchTitle = this.searchSpeaker = this.searchAbstract = '';
        this.selectedTrack = 'All';
        this.advancedSearch = false;
    }

    onTitleSearch(event: KeyboardEvent){
        this.searchTitle = (<HTMLInputElement>event.target).value;
        this.notify.emit({search: this.searchTitle, track: this.selectedTrack, speaker: this.searchSpeaker, abstract: this.searchAbstract});
    }

    onSpeakerSearch(event: KeyboardEvent){
        this.searchSpeaker = (<HTMLInputElement>event.target).value;
        this.notify.emit({search: this.searchTitle, track: this.selectedTrack, speaker: this.searchSpeaker, abstract: this.searchAbstract});
    }

    onAbstractSearch(event: KeyboardEvent){
        this.searchAbstract = (<HTMLInputElement>event.target).value;
        this.notify.emit({search: this.searchTitle, track: this.selectedTrack, speaker: this.searchSpeaker, abstract: this.searchAbstract});
    }
    
    onClear(){
        this.searchAbstract = '';
        this.searchSpeaker = '';
        this.notify.emit({search: this.searchTitle, track: this.selectedTrack, speaker: this.searchSpeaker, abstract: this.searchAbstract});
    }

    onNotify(){
        this.notify.emit({search: this.searchTitle, track: this.selectedTrack, speaker: this.searchSpeaker, abstract: this.searchAbstract});
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
