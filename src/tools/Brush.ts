import { Tool } from "./Tool";
import type { WebsocketFigure } from "../types";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class Brush extends Tool {
    private mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement, width: number, color: string, socket: WebSocket, id: string) {
        super(canvas, width, color, socket, id);
        this.ctx!.lineCap = 'round';
        this.mouseDown = false;
        this.listen();
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }


    private mouseDownHandler(event: MouseEvent) {
        this.lineWidth = this.lineWidthValue;
        this.lineColor = this.color;

        this.mouseDown = true;
        this.sendFigure({
            type: 'start',
            x: event.clientX - this.rect!.left,
            y: event.clientY - this.rect!.top,
            lineWidth: this.lineWidthValue,
            color: this.color
        })
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown) {
            // this.draw(event.clientX - this.rect!.left, event.clientY - this.rect!.top);
            this.sendFigure({
                type: 'brush',
                x: event.clientX - this.rect!.left,
                y: event.clientY - this.rect!.top,
                lineWidth: this.lineWidthValue,
                color: this.color
            })
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.sendFigure({
            type: 'finish'
        })
    }

    static draw(ctx: CanvasRenderingContext2D, { x, y }: WebsocketFigure) {
        ctx.lineTo(x!, y!);
        ctx.stroke();
    }
}