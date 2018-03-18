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
    timeslots: Timeslot[];
    test: any;


    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                let testslot = this.testTimeSlot();
                this.timeslots.push(testslot);
                this.timeslots.forEach(timeslot =>{
                    this.sessions.forEach(session =>{
                        const sessionDate = new Date(session.StartTime);
                        if (sessionDate === timeslot.StartTime) {
                            timeslot.Sessions.push(session);
                        }
                    });
                });
            });
        this.test = this.testTimeSlot().StartTime;
        this.filterTrack = 'All';
    }

    testTimeSlot() {
        const timeslot = new Timeslot();
        timeslot.StartTime = new Date('2018-04-20T10:00:00.000');
        return timeslot;
    }
}
