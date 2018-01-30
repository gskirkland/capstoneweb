import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionProposal } from '../../../models/session/session-proposal';
import { Event } from '../../../models/builder/event';

import { EventService } from '../../../services/event.service';
import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'builder-list',
    templateUrl: './builder-list.component.html',
    styleUrls: ['./builder-list.component.scss']
})

export class BuilderListComponent implements OnInit  {

    events: any[];
    header: any;
    event: Event;
    dialogVisible: boolean = false;

    idGen: number = 100;

    sessions:SessionProposal[];
    searchTitle: string;
    searchSpeaker: string;
    searchAbstract: string;
    filterTrack: string;


    constructor(private eventService: EventService, private sessionService:SessionService, private router: Router){}

    ngOnInit() {
        this.eventService.getEvents().then(events => {this.events = events;});

        this.header = {
            left: '',
            center: 'title',
            right: ''
        };

        this.sessionService.getAllSessionProposals()
            .then(sessions => {
                this.sessions = sessions;
            });
        this.filterTrack = 'All';
    }

    handleDayClick(event) {
        this.event = new Event();
        this.event.start = event.date.format();
        this.dialogVisible = true;
    }

    handleEventClick(e) {
        this.event = new Event();
        this.event.title = e.calEvent.title;

        const start = e.calEvent.start;
        const end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        //update
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        //new
        } else {
            this.event.id = this.idGen++;
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        const index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
}