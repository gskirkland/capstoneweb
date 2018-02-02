import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private _config: Object = {
        baseApiUrl: ''
    };

    get(key: string) {
        return this._config[key];
    }
}
