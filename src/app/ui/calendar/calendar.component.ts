import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionProposal } from './../../models/session/session-proposal';
import { SessionService } from './../../services/session.service';
import { SessionFavorite } from '../../models/session/session-favorite';
import { AuthService } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

    favorites: SessionFavorite[] = [];
    sessions: SessionProposal[] = [];
    calendar: {};
    modalInfo = new SessionProposal();

    constructor(private sessionService: SessionService, private authService: AuthService) {}

    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                const calendar = [];
                this.sessions.forEach(function(session) {
                    const start_time = moment(session.StartTime);
                    const year = start_time.year();
                    if (year > 2000) {
                        const month = start_time.month();
                        const month_name = moment.months(month);

                        const day = month_name + ' ' + start_time.date();
                        const time = moment(start_time.hour() + ':' + start_time.minutes(), 'HH:mm').format('h:mm a');

                        let has_day = false;
                        for (let i = 0; i < calendar.length; i++) {
                            if (calendar[i].day === day) {
                                has_day = true;
                                break;
                            }
                        }

                        if (!has_day) {
                            calendar.push({
                                day,
                                time_blocks: []
                            });
                            calendar.sort(function (a, b) {
                                if (a.day < b.day) {
                                    return -1;
                                }
                                if (a.day > b.day) {
                                    return 1;
                                }
                                return 0;
                            });
                        }

                        const day_index = calendar.map(a => a.day).indexOf(day);

                        let has_time = false;
                        for (let c = 0; c < calendar[day_index].time_blocks.length; c++) {
                            if (calendar[day_index].time_blocks[c].time === time) {
                                has_time = true;
                                break;
                            }
                        }

                        if (!has_time) {
                            calendar[day_index].time_blocks.push({
                                time,
                                session_list: []
                            });
                            calendar[day_index].time_blocks.sort((a, b) =>
                                new Date('1970/01/01 ' + a.time) > new Date('1970/01/01 ' + b.time));
                        }

                        const time_index = calendar[day_index].time_blocks.map(a => a.time).indexOf(time);

                        calendar[day_index].time_blocks[time_index].session_list.push(session);
                    }
                });
                    this.calendar = calendar;
                    console.log(calendar);
            });
                this.getFavorites();
    }

    getFavorites() {
        this.sessionService.getAllFavoriteSessions()
            .then(favorites => {
                this.favorites = favorites;
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
            if (index < 0) {
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

    showModal(sessionProposal: SessionProposal) {
        this.modalInfo = sessionProposal;
    }

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }

    scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}


