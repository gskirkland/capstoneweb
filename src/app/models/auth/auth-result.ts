import { AuthenticateResponse } from './authenticate-response';

export class AuthResult {

    Result: boolean;
    Status: number;
    Message: string;
    AuthenticationDetail: AuthenticateResponse;

    constructor(status: number, message: string) {
        this.Result = status === 200;
        this.Status = status;
        this.Message = message;
    }

    setAuthDetail(detail: AuthenticateResponse) {
        this.AuthenticationDetail = detail;
    }

}