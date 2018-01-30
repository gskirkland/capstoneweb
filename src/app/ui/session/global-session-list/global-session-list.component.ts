import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';

import { GlobalSessionSearchComponent } from './search/search.component';

import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'global-sessions',
    templateUrl: './global-session-list.component.html',
    styleUrls: [ './global-session-list.component.scss' ]

})

export class GlobalSessionListComponent implements OnInit  {

    sessions: SessionProposal[];
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    filterTrack: string;

    constructor(private sessionService:SessionService, private router: Router){}

    ngOnInit(){
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });
        this.filterTrack = 'All';
    }

    showMore(session){
        session.showMore = true;
    }

    showLess(session){
        session.showMore = false;
    }

    onVoteSessionClick(sessionProposal) {
        // Vote for session
        this.sessionService.voteForSession(sessionProposal.SessionProposalId)
            .then(result => {
                sessionProposal.CanVote = false;
            });
    }

    onNotify(obj: any){
        this.searchTitle = obj.search;
        this.filterTrack = obj.track;
        this.searchSpeaker = obj.speaker;
        this.searchAbstract = obj.abstract;
    }
    
    onRemoveVoteSessionClick(sessionProposal) {
        // Unvote for session
        this.sessionService.removeVoteForSession(sessionProposal.SessionProposalId)
            .then(result => {
                sessionProposal.CanVote = true;
            });
    }

}