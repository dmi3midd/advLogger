import fsPromises from 'fs/promises';

export default async function write(path: string, data: string): Promise<void> {
    try {
        await fsPromises.appendFile(path, data);
    } catch (error) {
        console.error('Error from logger =>', error);
    }
}