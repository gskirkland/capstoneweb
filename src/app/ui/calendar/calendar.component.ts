import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SessionProposal } from './../../models/session/session-proposal';
import { SessionService } from './../../services/session.service';
import { SessionFavorite } from '../../models/session/session-favorite';

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

    favorites: SessionFavorite[] = [];
    sessions: SessionProposal[];
    calendar: {};
    isBookmarked = false;

    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                const calendar_obj = <any>{};
                this.sessions.forEach(function(session) {
                    const start_time = moment(session.StartTime);
                    const month = start_time.month();
                    const month_name = moment.months(month);

                    const day = month_name + ' ' + start_time.date();
                    const time = moment(start_time.hour() + ':' + start_time.minutes(), 'HH:mm').format('h:mm a');

                    if (!(day in calendar_obj)) {
                        calendar_obj[day] = {
                            time_blocks: []
                        };
                    }

                    let has_time = false;
                    for (let c = 0; c < calendar_obj[day].time_blocks.length; c++) {
                        if (calendar_obj[day].time_blocks[c].time === time) {
                            has_time = true;
                            break;
                        }
                    }

                    if (!has_time) {
                        calendar_obj[day].time_blocks.push({
                            time,
                            session_list: []
                        });
                        calendar_obj[day].time_blocks.sort((a, b) => a.time > b.time);
                    }

                    const time_index = calendar_obj[day].time_blocks.map(a => a.time).indexOf(time);

                        calendar_obj[day].time_blocks[time_index].session_list.push(session);
                });

                    console.log(calendar_obj);
                    this.calendar = calendar_obj;
            });
                this.getFavorites();
    }

    getFavorites() {
        this.sessionService.getAllFavoriteSessions()
            .then(result => {
                this.favorites = result;
            });
    }

    onBookmarkClick(sessionProposal) {
        const index = this.favorites.map(session => session.SessionProposalId).indexOf(sessionProposal.SessionProposalId);

        if (index > -1) {
            this.sessionService.deleteUserFavorite(sessionProposal.SessionProposalId)
                .then(() => {
                    this.getFavorites();
                });
        } else {
            if (!this.isBookmarked) {
                this.sessionService.addFavoriteSession(sessionProposal)
                    .then(result => {
                        this.getFavorites();
                    });
            }
        }
    };

    bookmarked(sessionProposal: SessionProposal) {
        return this.favorites.map(session => session.SessionProposalId).indexOf(sessionProposal.SessionProposalId) > -1;
    }
}

