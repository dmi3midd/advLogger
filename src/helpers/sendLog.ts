export default async function sendLog(token: string, chatId: number, data: string) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: data,
                parse_mode: 'Markdown'
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText} on ${response.url}`);
        }
        const result = await response.json();
        // console.log(result);
    } catch (error) {
        console.error('Error from logger =>', error);
    }
}