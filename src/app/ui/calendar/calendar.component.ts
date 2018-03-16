import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SessionProposal } from './../../models/session/session-proposal';
import { SessionService } from './../../services/session.service';


@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {


    sessions: SessionProposal[];
    calendar_obj: {};
    isBookmarked = false;

    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                let calendar_obj = <any>{};
                this.sessions.forEach(function(item) {

                    let start_time = moment(item.StartTime);

                    let day = start_time.date();

                    let time = moment(start_time.hour() + ':' + start_time.minutes(), 'HH:mm').format('hh:mm a');

                    if (!(day in calendar_obj)) {
                        calendar_obj[day] = {
                            time_blocks: {}
                        };
                    }

                    if (!(time in calendar_obj[day].time_blocks)) {
                        calendar_obj[day].time_blocks[time] = [];
                    }

                    calendar_obj[day].time_blocks[time].push(item);
                });
                this.calendar_obj = calendar_obj;
                console.log(this.calendar_obj);
                console.log(Object.keys(calendar_obj));
            });
    }

    onBookmarkClick(sessionProposal) {
        let favorites: SessionProposal[]  = [];
        // let isBookmarked: boolean;
        this.sessionService.getAllFavoriteSessions()
            .then(result => {
                favorites = result;

                for (let item of favorites) {
                    if (item.SessionProposalId !== null) {
                        if (item.SessionProposalId === sessionProposal.SessionProposalId) {
                            this.isBookmarked = true;
                        }
                    }
                }
                if (!this.isBookmarked) {
                    this.sessionService.addFavoriteSession(sessionProposal)
                        .then(result => {
                            sessionProposal.FavoriteCount++;
                        });
                }
                if (this.isBookmarked) {
                    this.sessionService.deleteUserFavorite(sessionProposal.SessionProposalId)
                        .then(result => {
                           sessionProposal.FavoriteCount--;
                        });
                }
            });
    }
}

