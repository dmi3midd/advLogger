import fsPromises from 'fs/promises';

export default async function create(path: string): Promise<void> {
    try {
        await fsPromises.writeFile(path, "");
    } catch (error) {
        console.error('Error from logger =>', error);
    }
}