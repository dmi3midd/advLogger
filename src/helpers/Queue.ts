import { LogFunc } from "../types/LogFunc";

export default class Queue {
    private queue: string[] = [];
    private processing: boolean = false;
    private logfunc: LogFunc;
    constructor(logfunc: LogFunc) {
        this.logfunc = logfunc;
    }
    add(data: string): void {
        this.queue.push(data);
        this.process();
    }

    private async process(): Promise<void> {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length > 0) {
            const data: string | undefined = this.queue.shift();
            if (data === undefined) break;
            try {
                await this.logfunc(data);
            } catch (error) {
                throw new Error(`${error}`);
            }
        }
        this.processing = false;
    }
}