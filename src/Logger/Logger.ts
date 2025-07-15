import Queue from "../helpers/Queue";
import { Options } from "../types/Options";
import { Level } from "../types/Level";

import writeLog from "../helpers/writeLog";
import sendLog from "../helpers/sendLog";
import Log from "../helpers/Log";

export default class Logger {
    private isConsole: boolean;
    private logPath: string | undefined;
    private token: string | undefined;
    private chatId: number | undefined;

    private fileQueue: Queue | undefined;
    private tgQueue: Queue | undefined;
    private prefix: string | undefined;
    private levels: { [key: string]: boolean } = {
        START: true,
        END: true,
        SUCCESS: true,
        FAILURE: true,
        INFO: true,
        WARN: true,
        ERROR: true,
        DEBUG: true,
        EVENT: true,
    };
    constructor(options: Options) {
        this.isConsole = options.isConsole;
        if (options.pathToLogs) {
            this.logPath = options.pathToLogs;
            this.fileQueue = new Queue(async (data: string) => {
                if (this.logPath) {
                    await writeLog(this.logPath, data);
                }
            });
        }
        if (options.token && options.chatId) {
            this.token = options.token;
            this.chatId = options.chatId;
            this.tgQueue = new Queue(async (data: string) => {
                if (this.token && this.chatId) {
                    await sendLog(this.token, this.chatId, data);
                }
            });
        }
    }


    setPrefix(prefix: string) {
        if (prefix.trim() === '') {
            return;
        }
        this.prefix = prefix;
    }
    
    setLevel(level: Level, isEnabled: boolean) {
        this.levels[level] = isEnabled;
    }

    disable() {
        Object.keys(this.levels).forEach((level) => this.levels[level] = false);
    }

    enable() {
        Object.keys(this.levels).forEach(level => this.levels[level] = true);
    }

    start(message: string, payload?: Object) {
        if (!this.levels['START']) return;
        if (this.isConsole) console.log(new Log('START', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('START', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('START', message, this.prefix, payload).getTgLog());
        return;
    }

    end(message: string, payload?: Object) {
        if (!this.levels['END']) return;
        if (this.isConsole) console.log(new Log('END', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('END', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('END', message, this.prefix, payload).getTgLog());
        return;
    }

    success(message: string, payload?: Object) {
        if (!this.levels['SUCCESS']) return;
        if (this.isConsole) console.log(new Log('SUCCESS', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('SUCCESS', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('SUCCESS', message, this.prefix, payload).getTgLog());
        return;
    }

    failure(message: string, payload?: Object) {
        if (!this.levels['FAILURE']) return;
        if (this.isConsole) console.log(new Log('FAILURE', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('FAILURE', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('FAILURE', message, this.prefix, payload).getTgLog());
        return;
    }

    event(message: string, event: string, payload?: Object) {
        if (!this.levels['INFO']) return;
        if (this.isConsole) console.log(new Log('INFO', message, this.prefix, payload, event).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('INFO', message, this.prefix, payload, event).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('INFO', message, this.prefix, payload, event).getTgLog());
        return;
    }

    info(message: string, payload?: Object) {
        if (!this.levels['INFO']) return;
        if (this.isConsole) console.log(new Log('INFO', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('INFO', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('INFO', message, this.prefix, payload).getTgLog());
        return;
    }

    warn(message: string, payload?: Object) {
        if (!this.levels['WARN']) return;
        if (this.isConsole) console.log(new Log('WARN', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('WARN', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('WARN', message, this.prefix, payload).getTgLog());
        return;
    }

    debug(message: string, payload?: Object) {
        if (!this.levels['DEBUG']) return;
        if (this.isConsole) console.log(new Log('DEBUG', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('DEBUG', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('DEBUG', message, this.prefix, payload).getTgLog());
        return;
    }

    error(message: string, payload?: Object) {
        if (!this.levels['ERROR']) return;
        if (this.isConsole) console.log(new Log('ERROR', message, this.prefix, payload).getLog());
        if (this.logPath) this.fileQueue?.add(new Log('ERROR', message, this.prefix, payload).getLog());
        if (this.token && this.chatId) this.tgQueue?.add(new Log('ERROR', message, this.prefix, payload).getTgLog());
        return;
    }
}