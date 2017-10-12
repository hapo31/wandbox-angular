import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    private storage = localStorage;

    constructor() { }

    public getValue(key: string) {
        return JSON.parse(this.storage.getItem(key));
    }

    public setValue<T>(key: string, value: T) {
        console.log('storage store', key, value);
        this.storage.setItem(key, JSON.stringify(value));
    }

    public removeValue(key: string) {
        this.storage.setItem(key, null);
    }

    public hasValue(key: string) {
        return this.getValue(key) != null;
    }
}
