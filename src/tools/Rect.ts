/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tool } from "./Tool";
import type { WebsocketFigure } from "../types";

export class Rect extends Tool {
    private mouseDown: boolean;
    private startX: number;
    private startY: number;
    private width: number;
    private height: number;
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string, socket: WebSocket, id: string) {
        super(canvas, width, color, socket, id);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.width = 0;
        this.height = 0;
        this.saved = '';
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private draw() {
        const image = new Image();
        image.src = this.saved;
        image.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.beginPath();
            this.ctx?.rect(this.startX, this.startY, this.width, this.height);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }

    private mouseDownHandler(event: MouseEvent) {
        this.ctx!.lineWidth = 1;
        this.fillColor = this.color;
        this.lineColor = this.color;

        this.mouseDown = true;
        this.ctx?.beginPath();
        this.startX = event.clientX - this.rect!.left;
        this.startY = event.clientY - this.rect!.top;
        this.saved = this.canvas!.toDataURL();
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown) {
            const currentX: number = event.clientX - this.rect!.left;
            const currentY: number = event.clientY - this.rect!.top;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw();
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.sendFigure({
            type: 'rect',
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height,
            lineWidth: this.ctx!.lineWidth,
            color: this.color
        })
        setTimeout(() => {
            this.ctx!.lineWidth = this.lineWidthValue;
        }, 0);
    }

    static draw(ctx: CanvasRenderingContext2D, { x, y, width, height, lineWidth, color }: WebsocketFigure) {
        ctx.lineWidth = lineWidth!;
        ctx.strokeStyle = color!;
        ctx.fillStyle = color!;

        ctx.beginPath();
        ctx.rect(x!, y!, width!, height!);
        ctx.fill();
        ctx.stroke();
    }
}