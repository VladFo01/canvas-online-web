import { Tool } from "./Tool";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default class Brush extends Tool {
    private mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.ctx!.lineCap = 'round';
        this.mouseDown = false;
        this.listen();
    }

    private listen() {
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    private drawLine(x: number, y: number) {
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }

    private mouseDownHandler(event: MouseEvent) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(event.clientX - this.rect!.left, event.clientY - this.rect!.top);
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown) {
            this.drawLine(event.clientX - this.rect!.left, event.clientY - this.rect!.top);
        }
    }

    private mouseUpHandler() {
        this.mouseDown = false;
        this.ctx?.closePath();
    }
}