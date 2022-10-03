export interface WebsocketMessage {
    id: string
    method: 'connection' | 'draw' | 'save' | 'redo' | 'undo'
    dataUrl?: string
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

export interface ImageRequest {
    image: string
    sessionId?: string
}

export interface ImageResponse {
    message: string
}