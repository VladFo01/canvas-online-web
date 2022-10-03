/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Brush } from "../tools/Brush";
import { Circle } from "../tools/Circle";
import { Line } from "../tools/Line";
import { Rect } from "../tools/Rect";
import { Tool } from "../tools/Tool";
import type { WebsocketMessage } from "../types";

export const drawHandler = (msg: WebsocketMessage, ctx: CanvasRenderingContext2D, save?: (dataUrl: string) => void) => {
    const figure = msg.figure!;

    switch (figure.type) {
        case 'start':
            return Tool.startDraw(ctx, figure);
        case 'brush':
            return Brush.draw(ctx, figure);
        case 'rect':
            return Rect.draw(ctx, figure);
        case 'circle':
            return Circle.draw(ctx, figure);
        case 'line':
            return Line.draw(ctx, figure);
        case 'finish':
            return Tool.finishDraw(ctx);
        default:
            return null;
    }
}