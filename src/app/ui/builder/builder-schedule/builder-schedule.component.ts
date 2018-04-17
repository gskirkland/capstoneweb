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

    sessions: SessionProposal[] = [];
    filterTrack: string;
    days: Day[] = [];
    timeInput = '';
    addSlot = false;
    inputMargin = 2;
    error = '';
    success = '';
    rooms = ['BallroomA', 'BallRoomB', 'BallRoomC', '300A', '300B', '300C', '300D', '301A', '301B', '301C', '301D', '301E', 'ExibitHallB'];


    constructor(private sessionService: SessionService, private dragula: DragulaService) {
        this.dragula.setOptions('bag-sessions', {
            revertOnSpill: true
        });
    }

    ngOnInit() {
        const day1 = new Day();
        day1.Day = new Date('2018-04-20 0:00:00.000');
        this.days.push(day1);
        const day2 = new Day();
        day2.Day = new Date('2018-04-21 0:00:00.000');
        this.days.push(day2);
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
                this.orderTimeSlots();
            });
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

        let dayIndex = -1;
        let count = 0;
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
        timeslot.Rooms = this.rooms;
        timeslot.StartTime = time;
        this.days[dayIndex].Timeslots.push(timeslot);
        this.orderTimeSlots();
    }

    save() {
        this.updateDay(this.days[0]);
        this.updateDay(this.days[1]);
    }

    orderTimeSlots(): void {
        this.days[0].Timeslots.sort((leftSide, rightSide): number => {
            if (leftSide.StartTime < rightSide.StartTime) {return -1; }
            if (leftSide.StartTime > rightSide.StartTime) {return 1; }
            return 0;
        });
        this.days[1].Timeslots.sort((leftSide, rightSide): number => {
            if (leftSide.StartTime < rightSide.StartTime) {return -1; }
            if (leftSide.StartTime > rightSide.StartTime) {return 1; }
            return 0;
        });
    }
    timeValidate(): boolean {
        let verified: boolean;
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

    onRoomSelected(session, room) {
        session.Room = room;
    }

    checkSelected(timeslot, room) {
        return timeslot.Sessions.map(session => session.Room).indexOf(room) > -1;
    }

    removeSession(timeslot: Timeslot, session: SessionProposal) {
        let index = 0;
        for (let sp of timeslot.Sessions) {
            if (sp.SessionProposalId === session.SessionProposalId) {
                timeslot.Sessions.splice(index, 1);
                this.sessions.push(session);
            }
            index++;
        }
    }

    removeTimeslot(day: Day, timeslot: Timeslot) {
        let index = 0;
        let dayTemp = new Day();
        for (const d of this.days) {
            if (moment(d.Day).format('YYYY-MM-DD h.mm') === moment(day.Day).format('YYYY-MM-DD h.mm')) {
                dayTemp = d;
            }
        }
        index = 0;
        for (const slot of dayTemp.Timeslots) {
            if (moment(slot.StartTime).format('YYYY-MM-DD h.mm') === moment(timeslot.StartTime).format('YYYY-MM-DD h.mm')) {
                for (const session of slot.Sessions) {
                    this.removeSession(slot, session);
                }
                dayTemp.Timeslots.splice(index, 1);
            }
            index++;
        }
    }

    ngOnDestroy(): void {
        this.dragula.drop.unsubscribe();
    }

}
