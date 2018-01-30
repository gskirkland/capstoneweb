import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private _config: Object = {
        baseApiUrl: 'https://apidev.codestock.org/api/'
    };

    get(key: string) {
        return this._config[key];
    }
}
