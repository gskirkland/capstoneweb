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

    constructor(private sessionService:SessionService, private router: Router){}

    ngOnInit() {
        this.sessionService.getAllAcceptedSessionProposals()
            .then(sessions => {
                this.sessions = sessions;

                let calendar_obj = <any>{};
                this.sessions.forEach(function(item) {
                    let session_obj = <any>{};
                    session_obj.SessionProposalId = item.SessionProposalId;
                    session_obj.Title = item.Title;
                    session_obj.Abstract = item.Abstract;
                    session_obj.SpeakerName = item.SpeakerName;
                    session_obj.Track = item.Track;
                    session_obj.Room = item.Room;
                    session_obj.SpeakerConfirmed = item.SpeakerConfirmed;
                    session_obj.SpeakerCanceled = item.SpeakerCanceled;

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

                    calendar_obj[day].time_blocks[time].push(session_obj);
                });
                this.calendar_obj = calendar_obj;
                console.log(this.calendar_obj);
            });
    }
    // // TODO: Use UserFavorite model here
    // // TODO: Add delete functionality
    // onBookmarkClick(sessionProposal) {
    //     this.sessionService.addFavoriteSession(sessionProposal)
    //         .then(result => {
    //             sessionProposal.FavoriteCount ++;
    //         });
    // }
}
