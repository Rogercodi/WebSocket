
export class ParsedMessage {

    constructor () {}

    public parseMessage(data: Buffer): string {
        return (JSON.parse(data.toString())).command
    }
}