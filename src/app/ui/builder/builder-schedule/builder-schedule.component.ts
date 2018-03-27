import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';
import { Timeslot} from '../../../models/time/timeslot';

import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'app-builder-schedule',
    templateUrl: './builder-schedule.component.html',
    styleUrls: [ './builder-schedule.component.scss' ]
})

export class BuilderScheduleComponent implements OnInit  {

    sessions: SessionProposal[];
    filterTrack: string;
    timeslots: Timeslot[] = [];
    timeInput: string;
    addSlot = false;
    inputMargin = 2;


    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
                this.renderTimeSlots();
            });
        this.filterTrack = 'All';
    }

    addSlotTest(): void {
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
