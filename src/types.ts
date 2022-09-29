export interface WebsocketMessage {
    id: string
    method: 'connection' | 'draw',
    username?: string
    figure?: WebsocketFigure
}

export interface WebsocketFigure {
    type: 'start' | 'brush' | 'rect' | 'circle' | 'line' | 'finish'
    x?: number
    y?: number
    endX?: number
    endY?: number
    width?: number
    height?: number
    radius?: number
    lineWidth?: number
    color?: string | CanvasGradient | CanvasPattern
}