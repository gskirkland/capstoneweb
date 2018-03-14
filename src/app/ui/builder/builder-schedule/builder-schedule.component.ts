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
    filterTrack: string;
    session_obj: {};


    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                const session_obj = <any>{};
                this.sessions.forEach(function(item) {
                    session_obj.Title = item.Title;
                    session_obj.Abstract = item.Abstract;
                    session_obj.Track = item.Track;
                    session_obj.Room = item.Room;
                });
                this.session_obj = session_obj;
            });
        this.filterTrack = 'All';
    }
}
