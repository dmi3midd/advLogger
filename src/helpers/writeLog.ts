import exist from "../utils/exist";
import create from "../utils/create";
import write from "../utils/write";

export default async function writeLog(logPath: string, data: string): Promise<void> {
    try {
        if (!await exist(logPath)) {
        await create(logPath);
    }
    await write(logPath, data);
    } catch (error) {
        console.error('Error from logger =>', error);
    }
}