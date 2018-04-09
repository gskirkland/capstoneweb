import {Component, OnDestroy, OnInit} from '@angular/core';

import { SessionProposal } from '../../../models/session/session-proposal';
import { Timeslot} from '../../../models/time/timeslot';

import { SessionService } from '../../../services/session.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'app-builder-schedule',
    templateUrl: './builder-schedule.component.html',
    styleUrls: [ './builder-schedule.component.scss' ]
})

export class BuilderScheduleComponent implements OnInit, OnDestroy  {

    sessions: SessionProposal[];
    sessionsAccepted: SessionProposal[] = [];
    filterTrack: string;
    timeslots: Timeslot[] = [];
    timeInput: string;
    addSlot = false;
    inputMargin = 2;
    error = '';
    success = '';


    constructor(private sessionService: SessionService, private dragula: DragulaService) {}

    ngOnInit() {
        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
                this.renderTimeSlots();
            });
        this.filterTrack = 'All';
        // this.dragula.drop.subscribe(value => {
        //     console.log(value, this.timeslots);
        // });
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
            if (slot.StartTime.getDate() === time.getDate() && slot.StartTime.getTime() === time.getTime()) {
                return;
            }
        }
        const timeslot = new Timeslot();
        timeslot.StartTime = time;
        this.timeslots.push(timeslot);
        this.renderTimeSlots();
    }

    updateTime(session: SessionProposal): void {
        console.log(session, 'Updating Time');
    }

    save(): void {
        for (const timeslot of this.timeslots) {
            for (const session of timeslot.Sessions) {
                session.StartTime = timeslot.StartTime;
                console.log(JSON.stringify(session));
            }
            this.sessionService.updateSessionProposals(timeslot.Sessions)
                .then(() => this.success = 'Successfully update schedule')
                .catch((e) => this.error = 'There was an error completing your request!!!!!');
            //console.log(JSON.stringify(session));
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

    ngOnDestroy(): void {
        // this.dragula.drop.unsubscribe();
    }

}
