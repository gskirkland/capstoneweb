import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private _config: Object = {
        baseApiUrl: 'http://localhost:50623/api/'
    };

    get(key: string) {
        return this._config[key];
    }
}
