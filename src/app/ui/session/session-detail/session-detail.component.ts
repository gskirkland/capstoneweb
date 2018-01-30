import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';
import { SessionTrackType } from '../../../models/session/session-track-type';
import { SessionType } from '../../../models/session/session-type';

import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})

export class SessionDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  private tracks: any;
  private types: any;
  private sessionLengths: string[];
  private session: SessionProposal = new SessionProposal();
  private sessionProposalId: string;

  private selectedLength: number;
  private selectedLengthString: string;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  SessionTrackType: typeof SessionTrackType = SessionTrackType;
  SessionType: typeof SessionType = SessionType;

  ngOnInit() {
    this.router.navigate(['/sessions']);

    this.tracks = [
      { value: 0, display: 'Developer' },
      { value: 1, display: 'DevOps' },
      { value: 2, display: 'IT Pro' },
      { value: 3, display: 'Entrepreneur' },
      { value: 4, display: 'Design' }
    ];

    this.types = [
      { value: 0, display: 'Standard' },
      { value: 1, display: 'Panel' },
      { value: 2, display: 'Podcast' }
    ];

    this.sessionLengths = ['Normal (60 minutes)', 'Double (120 minutes)'];

    this.selectedLengthString = this.sessionLengths[0];

    this.sub = this.route.params.subscribe(params => {
      this.sessionProposalId = params['SessionProposalId'];
      if (this.sessionProposalId) {
        this.sessionService
          .getSessionProposal(this.sessionProposalId)
          .then(currentSession => {
            this.session = currentSession;
            this.loadSessionLength(this.session.LengthInMinutes);
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  parseSessionLengthValue(value: string) {
    this.selectedLengthString = value;
    const selectedIndex = this.sessionLengths.indexOf(value);

    if (selectedIndex == 0) {
      this.session.LengthInMinutes = 60;
    } else if (selectedIndex == 1) {
      this.session.LengthInMinutes = 120;
    }
  }

  loadSessionLength(value: number) {
    if (value == 60) {
      this.selectedLengthString = this.sessionLengths[0];
    } else if (value == 120) {
      this.selectedLengthString = this.sessionLengths[1];
    }
  }

  onSessionDeleteClick() {
    if (this.sessionProposalId) {
      // Delete session
      this.sessionService
        .deleteSession(this.session.SessionProposalId)
        .then(success => {
          this.router.navigate(['/sessions']);
        });
    }
  }

  onSubmit() {
    if (!this.sessionProposalId) {
      // Submit new session
      this.sessionService.submitSession(this.session).then(newSession => {
        this.session = newSession;
        this.router.navigate(['/sessions']);
      });
    } else {
      // Update existing session
      this.sessionService
        .updateSessionProposal(this.session, this.sessionProposalId)
        .then(newSession => {
          this.session = newSession;
          this.router.navigate(['/sessions']);
        });
    }
  }
}
