import {SessionProposal} from '../session/session-proposal';
import {Room} from '../builder/room';

export class Timeslot {
    StartTime: Date;
    Sessions: SessionProposal[];
    Rooms: string[];
    constructor() {
        this.Sessions = [];
        this.Rooms = [];
    };
}
