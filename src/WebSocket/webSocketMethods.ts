import { WebSocket } from "ws"

export class WebSocketMethods {

    constructor () {}

    public async play (ws: WebSocket) {
        ws.on('message', () => {
            console.log('message')
        })
    }
}