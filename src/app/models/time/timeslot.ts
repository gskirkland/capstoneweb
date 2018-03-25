import {SessionProposal} from '../session/session-proposal';

export class Timeslot {
    StartTime: Date;
    StartTimeHour: Number;
    Sessions: SessionProposal[];

    constructor() {
        this.Sessions = [];
    };
}
