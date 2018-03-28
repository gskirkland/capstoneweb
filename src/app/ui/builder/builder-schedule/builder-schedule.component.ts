import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';
import { Timeslot} from '../../../models/time/timeslot';

import { SessionService } from '../../../services/session.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'app-builder-schedule',
    templateUrl: './builder-schedule.component.html',
    styleUrls: [ './builder-schedule.component.scss' ]
})

export class BuilderScheduleComponent implements OnInit  {

    sessions: SessionProposal[];
    sessionsAccepted: SessionProposal[];
    filterTrack: string;
    timeslots: Timeslot[] = [];
    timeInput: string;
    addSlot = false;
    inputMargin = 2;


    constructor(private sessionService: SessionService, private dragula: DragulaService) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
                this.renderTimeSlots();
            });
        this.filterTrack = 'All';
    }

    addSlotEnable(): void {
        this.addSlot = !this.addSlot;
    }
    addTimeSlot() {
        if (this.timeInput.length === 0) {
            return;
        }
        const startTime = '2018-04-20 ' + this.timeInput;
        const time = new Date(startTime);
        for (const slot of this.timeslots) {
            if (slot.StartTime === time) {
                return;
            }
        }
        const timeslot = new Timeslot();
        timeslot.StartTime = time;
        this.timeslots.push(timeslot);
        this.renderTimeSlots();
    }

    dropSession(timeslot: Timeslot): void {
        let session: SessionProposal;
        this.dragula
            .drop
            .subscribe(value => {
                session = value;
                session.StartTime = timeslot.StartTime;
                this.sessionsAccepted.push(session);
            });
    }

    save(): void {
        for (const session of this.sessionsAccepted) {
            session.Accepted = true;
            let returnSession: Promise<SessionProposal>;
            returnSession = this.sessionService.updateSessionProposal(session, session.SessionProposalId);
        }
    }
    renderTimeSlots(): void {
        for (const timeslot of this.timeslots) {
            for (const session of this.sessions) {
                const sessionDate = new Date(session.StartTime);
                if (sessionDate.getHours() === timeslot.StartTime.getHours()) {
                    timeslot.Sessions.push(session);
                }
            }
        }
    }
}
