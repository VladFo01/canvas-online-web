import { WebsocketService } from "../utils/websocketService";
import type { WebsocketMessage, WebsocketFigure } from "../types";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class Tool {
    protected canvas: HTMLCanvasElement | null;
    protected ctx: CanvasRenderingContext2D | null | undefined;
    protected rect: DOMRect | undefined;
    protected id: string
    protected lineWidthValue: number
    protected color: string
    protected mouseDown: boolean
    private websocketService: WebsocketService

    constructor(canvas: HTMLCanvasElement | null, lineWidth: number, color: string, socket: WebSocket, id: string) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext('2d');
        this.rect = canvas?.getBoundingClientRect();
        this.websocketService = new WebsocketService(socket);
        this.id = id;
        this.lineWidthValue = lineWidth;
        this.color = color;
        this.mouseDown = false;

        this.ctx!.lineWidth = lineWidth;
        this.ctx!.strokeStyle = color;
        this.ctx!.fillStyle = color;
        this.destroyEvents();
    }

    static startDraw(ctx: CanvasRenderingContext2D, { x, y, lineWidth, color }: WebsocketFigure) {
        ctx.lineWidth = lineWidth!;
        ctx.strokeStyle = color!;
        ctx.fillStyle = color!;

        ctx.beginPath();
        ctx.moveTo(x!, y!);
    }

    static finishDraw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
    }

    set lineColor(color: string) {
        this.ctx!.strokeStyle = color;
        this.color = color;
    }

    set fillColor(color: string) {
        this.ctx!.fillStyle = color;
        this.color = color;
    }

    set lineWidth(width: number) {
        this.ctx!.lineWidth = width;
        this.lineWidthValue = width;
    }

    protected sendFigure(figure: WebsocketFigure) {
        this.websocketService.sendMessage<WebsocketMessage>({
            method: 'draw',
            id: this.id,
            figure
        })
    }

    private destroyEvents() {
        this.canvas!.onmousedown = null;
        this.canvas!.onmousemove = null;
        this.canvas!.onmouseup = null;
    }
}