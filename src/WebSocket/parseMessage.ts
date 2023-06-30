
export class ParsedMessage {

    constructor () {}

    public parseMessage(data: Buffer) {
        return (JSON.parse(data.toString())).command
    }
}