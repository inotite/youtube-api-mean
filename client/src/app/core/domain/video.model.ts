export interface Video {
    _id: string,
    name: string;
    snippet: string;
    contentDetails: string;
    statistics: string;
    status: string;
}

export const defaultVideo: Video = {
    _id: null,
    name: "",
    snippet: "",
    contentDetails: "",
    statistics: "",
    status: "",
};
