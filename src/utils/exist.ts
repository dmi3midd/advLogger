import fsPromises from 'fs/promises';

export default async function exist(path: string): Promise<boolean> {
    try {
        await fsPromises.access(path);
        return true;
    } catch (error) {
        return false;
    }
}