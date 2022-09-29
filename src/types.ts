export type messageRequest = {
    id: string
    method: 'connection' | 'draw',
    username: string
}