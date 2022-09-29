/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class WebsocketService {
    private socket: WebSocket | null

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    public handleConnection(handler: () => void) {
        this.socket!.onopen = handler;
    }

    public handleMessage(handler: (msg: MessageEvent) => void) {
        this.socket!.onmessage = handler;
    }

    public sendMessage<T>(msg: string | object | T) {
        this.socket!.send(JSON.stringify(msg));
    }
}