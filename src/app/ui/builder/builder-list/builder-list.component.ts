import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionProposal } from '../../../models/session/session-proposal';
import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'builder-list',
    templateUrl: './builder-list.component.html',
    styleUrls: ['./builder-list.component.scss']
})

export class BuilderListComponent implements OnInit {

    sessions: SessionProposal[];
    savedSuccessfully: boolean;
    messages: any[] = [];

    constructor(private sessionService: SessionService, private router: Router) {
    }

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });
    }

    clickSession(sessionProposal: SessionProposal) {
        if (sessionProposal.Accepted === true) {
            sessionProposal.Accepted = false;
        } else if (sessionProposal.Accepted === false) {
            sessionProposal.Accepted = true;
        }
    }

    accepted(sessionProposal: SessionProposal) {
        return sessionProposal.Accepted;
    }

    save() {
        this.sessionService.updateSessionProposals(this.sessions)
            .then(r => {
                this.savedSuccessfully = true;
                this.alert();
            });
    }

    alert() {
        this.messages.push({severity: 'success', detail: 'Success!'});

    }
}
