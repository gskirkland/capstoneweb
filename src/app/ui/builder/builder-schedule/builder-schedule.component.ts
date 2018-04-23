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
        this.getAcceptedSessions();
        this.filterTrack = 'All';
    }
    clickTab() {
        this.orderTimeSlots();
        this.renderSessions();

    }
    clearAllSessions() {
        for (const day of this.days) {
            for (const slot of day.Timeslots) {
                slot.Sessions.splice(0, slot.Sessions.length);
            }
            day.Timeslots.splice(0, day.Timeslots.length);
        }
    }

    getAcceptedSessions() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });
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
        const sessionList = [];
        for (const day of this.days) {
            this.updateDaySessionTimes(day);
            for (const timeslot of day.Timeslots) {
                console.log(timeslot.Sessions);
                sessionList.push(...timeslot.Sessions);
            }
        }
        sessionList.push(...this.sessions);
        console.log(sessionList, this.sessions);
        this.updateSessions(sessionList);
    }

    updateDaySessionTimes(day: Day) {
        for (const timeslot of day.Timeslots) {
            const date = moment(timeslot.StartTime);
            const year = date.year();
            const month = date.month();
            const dayNum = date.date();
            const hour = date.hour();
            const min = date.minutes();
            const sec = date.seconds();
            const milSec = date.milliseconds();
            for (const session of timeslot.Sessions) {
                session.StartTime = new Date(Date.UTC(year, month, dayNum, hour, min, sec, milSec));

                /*const duration = session.LengthInMinutes;
                const end = new Date(session.StartTime);
                end.setMinutes(session.StartTime.getMinutes() + duration);
                session.EndTime = new Date(end);*/
                console.log(timeslot.StartTime);
                console.log(JSON.stringify(session));
            }
        }
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

    updateSessions(sessions: SessionProposal[]) {
        console.log('updating', sessions);
            this.sessionService.updateSessionProposals(sessions)
                .then(() => this.success = 'Successfully update schedule')
                .catch((e) => this.error = 'There was an error completing your request!!!!!');
    }

    renderSessions() {
        if (this.sessions.length === 0) {
            return false;
        }
        this.clearAllSessions();
        const schSessions: SessionProposal[] = [];
        const ids = [];
        for (const session of this.sessions) {
            if (session.StartTime && moment(session.StartTime).format('YYYY-MM-DD') !== '1900-01-01') {
                schSessions.push(session);
                ids.push(session.SessionProposalId);
            }
        }
        for (const id of ids) {
            this.removeUnscheduledSession(id, this.sessions);
        }
        schSessions.sort((leftSide, rightSide): number => {
            if (leftSide.StartTime < rightSide.StartTime) {return -1; }
            if (leftSide.StartTime > rightSide.StartTime) {return 1; }
            return 0;
        });
        const indexes = [];
        if (schSessions.length !== 0 ) {
            indexes.push(0);
        }
        for (let i = 0; i < schSessions.length - 1; i++) {
            if (moment(schSessions[i].StartTime).format('YYYY-MM-DD h.mm') !==
                moment(schSessions[i + 1].StartTime).format('YYYY-MM-DD h.mm')) {
                indexes.push(i + 1);
            }
        }
        console.log(indexes);
        console.log('Hello');
        const timeslots: Timeslot[] = [];
        for (const i of indexes) {
            const slot = new Timeslot();
            slot.Rooms = this.rooms;
            slot.StartTime = schSessions[i].StartTime;
            timeslots.push(slot);
            console.log(JSON.stringify(slot.StartTime));
        }
        for (const session of schSessions) {
            for (const slot of timeslots) {
                if (moment(slot.StartTime).format('YYYY-MM-DD h.mm') ===
                        moment(session.StartTime).format('YYYY-MM-DD h.mm')) {
                    slot.Sessions.push(session);
                }
            }
        }
        for (const slot of timeslots) {
            if (moment(this.days[0].Day).format('YYYY-MM-DD') ===
                moment(slot.StartTime).format('YYYY-MM-DD')) {
                this.days[0].Timeslots.push(slot);
            }
            if (moment(this.days[1].Day).format('YYYY-MM-DD') ===
                moment(slot.StartTime).format('YYYY-MM-DD')) {
                this.days[1].Timeslots.push(slot);
            }
        }
    }

    onRoomSelected(session, room) {
        session.Room = room;
    }

    checkSelected(timeslot, room) {
        return timeslot.Sessions.map(session => session.Room).indexOf(room) > -1;
    }

    removeSession(timeslot: Timeslot, session: SessionProposal) {
        console.log('REMOVING SESSION');
        // let index = 0;
        const index = timeslot.Sessions.indexOf(session);
        if (index > -1) {
            timeslot.Sessions.splice(index, 1);
            this.resetSession(session);
            this.sessions.push(session);
        }
        /*for (const sp of timeslot.Sessions) {
            if (sp.SessionProposalId === session.SessionProposalId) {
                timeslot.Sessions.splice(index, 1);
                this.resetSession(sp);
                this.sessions.push(session);
            }
            index++;
        }*/
    }

    removeTimeslot(day: Day, timeslot: Timeslot) {
        console.log('REMOVING TIMESLOT');
        for (const session of timeslot.Sessions) {
            this.resetSession(session);
        }
        const slotSessions = timeslot.Sessions;
        const unschSessions = this.sessions;
        const index = day.Timeslots.indexOf(timeslot);
        if (index > -1) {
            this.sessions = [...slotSessions, ...unschSessions];
            day.Timeslots.splice(index, 1);
        }
    }

    resetSession(session: SessionProposal) {
        console.log('RESETTING SESSION');
        session.StartTime = new Date('1900-01-01');
        session.Room = '';
    }
    removeUnscheduledSession(id: string, sessions: SessionProposal[]) {
        console.log('REMOVE UNSCHEDULED SESSION');
        for (let index = 0; index < sessions.length; index++) {
            if (sessions[index].SessionProposalId === id) {
                sessions.splice(index, 1);
            }
        }
    }

    ngOnDestroy(): void {
        // this.dragula.drop.unsubscribe();
        this.dragula.destroy('bag-sessions');
    }

}
