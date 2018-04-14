import {Component, OnDestroy, OnInit} from '@angular/core';

import { SessionProposal } from '../../../models/session/session-proposal';
import { Timeslot} from '../../../models/time/timeslot';

import { SessionService } from '../../../services/session.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {Day} from '../../../models/time/day';
import * as moment from 'moment';

@Component({
    selector: 'app-builder-schedule',
    templateUrl: './builder-schedule.component.html',
    styleUrls: [ './builder-schedule.component.scss' ]
})

export class BuilderScheduleComponent implements OnInit, OnDestroy  {

    sessions: SessionProposal[];
    filterTrack: string;
    days: Day[] = [];
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
        const day1 = new Day();
        day1.Day = new Date('2018-04-20 0:00:00.000');
        this.days.push(day1);
        const day2 = new Day();
        day2.Day = new Date('2018-04-21 0:00:00.000');
        this.days.push(day2);
        this.filterTrack = 'All';
    }

    addSlotEnable(): void {
        this.addSlot = !this.addSlot;
    }
    addTimeSlot(date: Date) {
        const validate = this.timeValidate();
        if (this.timeInput.length === 0 || !validate) {
            return;
        }
        const dateString = moment(date).format('YYYY-MM-DD');
        const startTime = dateString + ' ' + this.timeInput;
        const time = new Date(startTime);

        var dayIndex = -1;
        var count = 0;
        for (const day of this.days) {
            if (moment(time).format('YYYY-MM-DD') === moment(day.Day).format('YYYY-MM-DD')) {
                dayIndex = count;
            }
            count++;
        }
        for (const slot of this.days[dayIndex].Timeslots) {
            if (moment(slot.StartTime).format('YYYY-MM-DD h.mm') === moment(time).format('YYYY-MM-DD h.mm')) {
                return;
            }
        }
        const timeslot = new Timeslot();
        timeslot.StartTime = time;
        this.days[dayIndex].Timeslots.push(timeslot);
        this.renderTimeSlots();
    }

    save() {
        this.updateDay(this.days[0]);
        this.updateDay(this.days[1]);
    }

    renderTimeSlots(): void {
        for (const timeslot of this.days[0].Timeslots) {
            for (const session of this.sessions) {
                const sessionDate = new Date(session.StartTime);
                if (moment(sessionDate).format('YYYY-MM-DD h.mm') === moment(timeslot.StartTime).format('YYYY-MM-DD h.mm')) {
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

    updateDay(day: Day) {
        for (const timeslot of day.Timeslots) {
            const year = timeslot.StartTime.getFullYear();
            const month = timeslot.StartTime.getMonth();
            const dayNum = timeslot.StartTime.getDate();
            const hour = timeslot.StartTime.getHours();
            const min = timeslot.StartTime.getMinutes();
            const sec = timeslot.StartTime.getSeconds();
            const milSec = timeslot.StartTime.getMilliseconds();
            for (const session of timeslot.Sessions) {
                session.StartTime = new Date(Date.UTC(year, month, dayNum, hour, min, sec, milSec));
                console.log(timeslot.StartTime);
                console.log(JSON.stringify(session));
            }
            this.sessionService.updateSessionProposals(timeslot.Sessions)
                .then(() => this.success = 'Successfully update schedule')
                .then(() => this.error = '')
                .catch((e) => this.error = 'There was an error completing your request!!!!!')
                .catch((e) => this.success = '');
        }
    }

    ngOnDestroy(): void {
        //this.dragula.drop.unsubscribe();
    }

}
