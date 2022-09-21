/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tool } from "./Tool";

export class Rect extends Tool {
    private mouseDown: boolean;
    private startX: number;
    private startY: number;
    private width: number;
    private height: number;
    private selectedWidth: number;
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string) {
        super(canvas, width, color);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.width = 0;
        this.height = 0;
        this.selectedWidth = this.ctx!.lineWidth;
        this.saved = '';
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private draw(x: number, y: number, width: number, height: number) {
        const image = new Image();
        image.src = this.saved;
        image.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.beginPath();
            this.ctx?.rect(x, y, width, height);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }

    private mouseDownHandler(event: MouseEvent) {
        this.ctx!.lineWidth = 1;
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
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        setTimeout(() => {
            this.ctx!.lineWidth = this.selectedWidth;
        }, 0);
    }
}