import {Timeslot} from './timeslot';

export class Day {
    Day: Date;
    Timeslots: Timeslot[];

    constructor() {
        this.Timeslots = [];
    }
}
