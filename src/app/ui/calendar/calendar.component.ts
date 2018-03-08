import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionProposal } from './../../models/session/session-proposal';
import { SessionService } from './../../services/session.service';


@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

    sessions: SessionProposal[];
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    filterTrack: string;
    timeSlots: string[];
    timeSlot: string;

    constructor(private sessionService:SessionService, private router: Router){}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });

        this.timeSlots = ['10A', '11A', '12P', '1P', '2P', '3P', '4P', '5P'];
    }
}
