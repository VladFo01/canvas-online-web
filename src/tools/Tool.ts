/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class Tool {
    protected canvas: HTMLCanvasElement | null;
    protected ctx: CanvasRenderingContext2D | null | undefined;
    protected rect: DOMRect | undefined;
    
    constructor(canvas: HTMLCanvasElement | null, width: number, color: string) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext('2d');
        this.ctx!.lineWidth = width;
        this.ctx!.strokeStyle = color;
        this.ctx!.fillStyle = color;
        this.rect = canvas?.getBoundingClientRect();
        this.destroyEvents();
    }

    set lineColor(color: string) {
        this.ctx!.strokeStyle = color;
    }

    set fillColor(color: string) {
        this.ctx!.fillStyle = color;
    }

    set lineWidth(width: number) {
        this.ctx!.lineWidth = width;
    }

    private destroyEvents() {
        this.canvas!.onmousedown = null;
        this.canvas!.onmousemove = null;
        this.canvas!.onmouseup = null;
    }
}