export interface Video {
    id: string,
    name: string;
    weight: number;
    symbol: string;
}

export const defaultVideo: Video = {
    id: null,
    name: null,
    weight: 1,
    symbol: ""
};
