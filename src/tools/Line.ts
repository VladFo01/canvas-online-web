/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tool } from "./Tool";
import type { WebsocketFigure } from "../types";

export class Line extends Tool {
    private startX: number;
    private startY: number;
    private endX: number
    private endY: number
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string, socket: WebSocket, id: string) {
        super(canvas, width, color, socket, id);
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.saved = '';
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private drawLine() {
        const image = new Image();
        image.src = this.saved;
        image.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.startX, this.startY);
            this.ctx?.lineTo(this.endX, this.endY);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }

    private mouseDownHandler(event: MouseEvent) {
        this.lineWidth = this.lineWidthValue;
        this.lineColor = this.color;

        this.mouseDown = true;
        this.startX = event.clientX - this.rect!.left;
        this.startY = event.clientY - this.rect!.top;
        this.saved = this.canvas!.toDataURL();
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown) {
            this.endX = event.clientX - this.rect!.left;
            this.endY = event.clientY - this.rect!.top;
            this.drawLine();
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.sendFigure({
            type: 'line',
            x: this.startX,
            y: this.startY,
            endX: this.endX,
            endY: this.endY,
            lineWidth: this.lineWidthValue,
            color: this.color
        })
        this.sendFigure({
            type: 'finish'
        })
    }

    static draw(ctx: CanvasRenderingContext2D, { x, y, endX, endY, lineWidth, color }: WebsocketFigure) {
        ctx.lineWidth = lineWidth!;
        ctx.strokeStyle = color!;
        ctx.fillStyle = color!;

        ctx.beginPath();
        ctx.moveTo(x!, y!);
        ctx.lineTo(endX!, endY!);
        ctx.fill();
        ctx.stroke();
    }
}