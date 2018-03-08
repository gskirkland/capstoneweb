import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionProposal } from '../../models/session/session-proposal';
import { SessionService } from '../../services/session.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
    selector: 'bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss' ]
})


export class BookmarksComponent implements OnInit {
    sessions: SessionProposal[];
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    filterTrack: string;
    timeSlots: string[];
    timeSlot: string;

    // TODO Build constructor for bookmarked sessions.
    constructor(private sessionService: SessionService, private router: Router) {}



    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then( sessions => {
                    this.sessions = sessions;
            });

        this.timeSlots = ['10A', '11A', '12P', '1P', '2P', '3P', '4P', '5P'];
    }
}

