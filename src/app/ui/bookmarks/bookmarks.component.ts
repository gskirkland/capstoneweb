import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionProposal } from './../../models/session/session-proposal';
import { SessionService } from './../../services/session.service';
import { SessionFavorite } from '../../models/session/session-favorite';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss' ]
})

export class BookmarksComponent implements OnInit {

    favorites: SessionFavorite[] = [];
    sessions: SessionProposal[];
    calendar: {};

    constructor(private sessionService: SessionService, private authService: AuthService) {
    }

    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                const calendar = [];
                this.sessions.forEach(function (session) {
                    const start_time = moment(session.StartTime);
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
                        calendar[day_index].time_blocks.sort((a, b) => a.time > b.time);
                    }

                    const time_index = calendar[day_index].time_blocks.map(a => a.time).indexOf(time);

                    calendar[day_index].time_blocks[time_index].session_list.push(session);

                });
                this.calendar = calendar;
                console.log(calendar);
            });
        this.getFavoriteDetail();
    }

    getFavoriteDetail() {
        this.sessionService.getAllFavoriteSessions()
            .then(favorites => {
                this.favorites = favorites;
            });
    }

    /*ToDo: Fix deleteUserFavorite - 400 response*/
    onRemoveClick(sessionProposal) {
        this.sessionService.deleteUserFavorite(sessionProposal.SessionProposalId)
            .then(() => {
                this.getFavoriteDetail();
            });
    }

    /*ToDo: Add showModal method*/
    /*showModal();*/
}



