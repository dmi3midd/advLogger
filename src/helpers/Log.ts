export default class Log {
    level: string;
    prefix: string | undefined;
    message: string;
    payload: Object | undefined;
    event: string | undefined
    constructor(level: string, message: string, prefix?: string, payload?: Object, event?: string) {
        this.level = level;
        this.prefix = prefix;
        this.message = message;
        this.payload = payload;
        this.event = event;
    }

    now: Date = new Date();
    date: string | number = this.now.getDate() < 10 ? `0${this.now.getDate()}` : this.now.getDate();
    month: string | number = this.now.getMonth() + 1 < 10 ? `0${this.now.getMonth() + 1}` : this.now.getMonth() + 1;
    year: number = this.now.getFullYear();
    hours: string | number = this.now.getHours() < 10 ? `0${this.now.getHours()}` : this.now.getHours();
    minutes: string | number = this.now.getMinutes() < 10 ? `0${this.now.getMinutes()}` : this.now.getMinutes();
    seconds: string | number = this.now.getSeconds() < 10 ? `0${this.now.getSeconds()}` : this.now.getSeconds();
    time: string = `${this.date}.${this.month}.${this.year} ${this.hours}:${this.minutes}:${this.seconds}`;

    getLog() {
        const log: string = `${this.time}   ${this.level.padEnd(8, ' ')}${!this.prefix ? '' : '  '+this.prefix}   ${this.message}${!this.payload  ? '' : '   '+JSON.stringify(this.payload)}   ${!this.event ? '' : this.event}\n`;
        return log;
    }

    getTgLog() {
        const log: string = `${this.time}
${this.level.padEnd(8, ' ')}${!this.prefix ? '' : '  ' + this.prefix}
${this.message}
${!this.payload ? '' : '```json\n' + JSON.stringify(this.payload, null, 2) + '\n```'}
${!this.event ? '' : this.event}
`;
        return log;
    }
}