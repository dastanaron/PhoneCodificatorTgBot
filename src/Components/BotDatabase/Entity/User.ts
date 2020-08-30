export interface UserEntity {
    tgUserId: number;
    username: string;
    firstName?: string;
    lastName?: string;
    isBot: boolean;
    languageCode?: string;
    createdAt: Date;
}

export default class User implements UserEntity {
    private _tgUserId: number;
    private _username: string;
    private _firstName: string;
    private _lastName: string;
    private _isBot: boolean;
    private _languageCode: string;
    private _createdAt: Date;

    constructor() {
        this._tgUserId = 0;
        this._username = '';
        this._firstName = '';
        this._lastName = '';
        this._isBot = false;
        this._languageCode = 'en';
        this._createdAt = new Date();
    }

    get tgUserId(): number {
        return this._tgUserId;
    }

    set tgUserId(value: number) {
        this._tgUserId = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get isBot(): boolean {
        return this._isBot;
    }

    set isBot(value: boolean) {
        this._isBot = value;
    }

    get languageCode(): string {
        return this._languageCode;
    }

    set languageCode(value: string) {
        this._languageCode = value;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }
}
