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
    test: any;


    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                const testslot = this.testTimeSlot();
                this.timeslots.push(testslot);
                for (const timeslot of this.timeslots) {
                    for (const session of this.sessions) {
                        const sessionDate = new Date(session.StartTime);
                        if (sessionDate.getHours() === timeslot.StartTime.getHours()) {
                            timeslot.Sessions.push(session);
                        }
                    };
                };
            });
        this.test = this.testTimeSlot().StartTime.getHours();
        this.filterTrack = 'All';
    }

    testTimeSlot() {
        const timeslot = new Timeslot();
        timeslot.StartTime = new Date('2018-04-20 16:00:00.000');
        return timeslot;
    }

    addTimeSlot() {
        const time = new Date('2018-04-20T10:00:00.000');
        for (const slot of this.timeslots) {
            if (slot.StartTime === time) {
                return;
            }
        }
        const timeslot = new Timeslot();
        timeslot.StartTime = time;
        this.timeslots.push(timeslot);
    }
}
