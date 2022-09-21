/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tool } from "./Tool";

export class Line extends Tool {
    private startX: number;
    private startY: number;
    private mouseDown: boolean;
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string) {
        super(canvas, width, color);
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.mouseDown = false;
        this.saved = '';
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private drawLine(x: number, y: number) {
        const image = new Image();
        image.src = this.saved;
        image.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.startX, this.startY);
            this.ctx?.lineTo(x, y);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }

    private mouseDownHandler(event: MouseEvent) {
        this.mouseDown = true;
        this.startX = event.clientX - this.rect!.left;
        this.startY = event.clientY - this.rect!.top;
        this.saved = this.canvas!.toDataURL();
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown) {
            const currentX = event.clientX - this.rect!.left;
            const currentY = event.clientY - this.rect!.top;
            this.drawLine(currentX, currentY);
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.ctx?.closePath();
    }
}