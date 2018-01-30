import { User } from '../user/user';
import { AuthenticateStatusCode } from './authenticate-status-code';

export class AuthenticateResponse {
    AuthenticationToken: string;
    Message: string;
    UserInformation: User;
    Status: AuthenticateStatusCode;
}