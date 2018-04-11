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
    timeInput = '';
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
    }

    addSlotEnable(): void {
        this.addSlot = !this.addSlot;
    }
    addTimeSlot() {
        const validate = this.timeValidate();
        if (this.timeInput.length === 0 || !validate) {
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

    save() {
        for (const timeslot of this.timeslots) {
            const year = timeslot.StartTime.getFullYear();
            const month = timeslot.StartTime.getMonth();
            const day = timeslot.StartTime.getDate();
            const hour = timeslot.StartTime.getHours();
            const min = timeslot.StartTime.getMinutes();
            const sec = timeslot.StartTime.getSeconds();
            const milSec = timeslot.StartTime.getMilliseconds();
            for (const session of timeslot.Sessions) {
                session.StartTime = new Date(Date.UTC(year, month, day, hour, min, sec, milSec));
                console.log(timeslot.StartTime);
                console.log(JSON.stringify(session));
            }
            this.sessionService.updateSessionProposals(timeslot.Sessions)
                .then(() => this.success = 'Successfully update schedule')
                .then(() => this.error = '')
                .catch((e) => this.error = 'There was an error completing your request!!!!!')
                .catch(() => this.success = '');
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

    timeValidate(): boolean {
        var verified: boolean;
        const date = new Date('2018-04-20 ' + this.timeInput);
        const test = date.getDate();
        if (isNaN(test)) {
            verified = false;
        } else {
            verified = true;
        }
        return verified;
    }

    ngOnDestroy(): void {
        this.dragula.drop.unsubscribe();
    }

}
