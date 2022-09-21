/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tool } from "./Tool";

export class Circle extends Tool {
    private selectedWidth: number;
    private mouseDown: boolean;
    private startX: number;
    private startY: number;
    private saved: string;

    constructor(canvas: HTMLCanvasElement, width: number, color: string) {
        super(canvas, width, color);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.saved = '';
        this.selectedWidth = this.ctx!.lineWidth;
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private draw(centerX: number, centerY: number, radius: number) {
        const image = new Image();
        image.src = this.saved;
        image.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx?.beginPath();
            this.ctx?.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
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
            const radiusX: number = Math.abs((currentX - this.startX) / 2);
            const radiusY: number = Math.abs((currentY - this.startY) / 2);
            const radius: number = (radiusX < radiusY ? radiusX : radiusY) - this.ctx!.lineWidth / 2;
            const posX: number = this.startX < currentX ? 1 : -1;
            const posY: number = this.startY < currentY ? 1 : -1;
            const centerX: number = this.startX + radius * posX;
            const centerY: number = this.startY + radius * posY;
            this.draw(centerX, centerY, radius);
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        setTimeout(() => {
            this.ctx!.lineWidth = this.selectedWidth;
        }, 0)
    }
}