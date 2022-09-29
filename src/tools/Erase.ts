/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Brush } from "./Brush";

export class Erase extends Brush {
    constructor(canvas: HTMLCanvasElement, width: number, color: string, socket: WebSocket, id: string) {
        super(canvas, width, color, socket, id);
        this.lineColor = '#fff';
        this.fillColor = '#fff';
    }

    override set lineColor(color: string) {
        this.ctx!.fillStyle = '#fff';
        this.color = '#fff';
    }

    override set fillColor(color: string) {
        this.ctx!.strokeStyle = '#fff';
        this.ctx!.strokeStyle = '#fff';
    }
}