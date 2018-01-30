import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';

import { EventService } from '../../../services/event.service';
import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'builder-schedule',
    templateUrl: './builder-schedule.component.html',
    styleUrls: [ './builder-schedule.component.scss' ]
})

export class BuilderScheduleComponent implements OnInit  {

    sessions: SessionProposal[];
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    filterTrack: string;


    constructor(private sessionService:SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });
        this.filterTrack = 'All';
    }
}
