import { SessionType } from './session-type';
import { SessionTrackType } from './session-track-type';
import { SessionStatusType } from './session-status-type';
import { Tag } from '../meta/tag';

export class SessionProposal {
    SessionProposalId: string;
    Title: string;
    Abstract: string;
    Description: string;
    UserId: string;
    VoteCount: number;
    FavoriteCount: number;
    Type: SessionType;
    LengthInMinutes: number;
    Track: SessionTrackType;
    Status: SessionStatusType;
    Accepted: boolean;
    Tags: Tag[];
    Room: string;
    StartTime: Date;
    SpeakerName: string;
    SpeakerConfirmed: boolean;
    SpeakerCanceled: boolean;

    constructor() {
        this.Type = SessionType.Standard;
        this.Track = SessionTrackType.Developer;
    }
}