import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';

import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'login',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  sessions: SessionProposal[];

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    this.sessionService.getSessionProposals().then(sessions => {
      this.sessions = sessions;
    });
  }

  onSubmitSessionClick() {
    // this.router.navigate(['/sessions/submit']);
  }

  editSession(session: SessionProposal) {
    this.router.navigate(['/sessions/' + session.SessionProposalId]);
  }
}
