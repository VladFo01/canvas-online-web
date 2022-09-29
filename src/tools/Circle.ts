/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { WebsocketFigure } from "../types";
import { Tool } from "./Tool";

export class Circle extends Tool {
    private startX: number;
    private startY: number;
    private centerX: number
    private centerY: number
    private radius: number
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string, socket: WebSocket, id: string) {
        super(canvas, width, color, socket, id);
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;
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
            this.ctx?.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
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
            const radiusX: number = Math.abs((currentX - this.startX) / 2);
            const radiusY: number = Math.abs((currentY - this.startY) / 2);
            this.radius = (radiusX < radiusY ? radiusX : radiusY) - this.ctx!.lineWidth / 2;
            const posX: number = this.startX < currentX ? 1 : -1;
            const posY: number = this.startY < currentY ? 1 : -1;
            this.centerX = this.startX + this.radius * posX;
            this.centerY = this.startY + this.radius * posY;
            this.draw();
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.sendFigure({
            type: 'circle',
            x: this.centerX,
            y: this.centerY,
            radius: this.radius,
            lineWidth: this.ctx!.lineWidth,
            color: this.color
        })
        setTimeout(() => {
            this.ctx!.lineWidth = this.lineWidthValue;
        }, 0)
    }

    static draw(ctx: CanvasRenderingContext2D, { x, y, radius, lineWidth, color }: WebsocketFigure) {
        ctx.lineWidth = lineWidth!;
        ctx.strokeStyle = color!;
        ctx.fillStyle = color!;

        ctx.beginPath();
        ctx.arc(x!, y!, radius!, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }
}