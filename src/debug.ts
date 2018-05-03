export function debug(text: string) {
    if (process.env.DEBUG) {
        console.log(text);
    }
}