export interface Video {
    _id: string,
    video_id: string;
    title: string ;
    description: string;
    tags: string;
    total_views: Number;
    likes: Number;
    dislikes: Number;
    current_viewers: Number;
    joining_viewers: Number;
    leaving_viewers: Number;
    published_at: string;
    comment_count: Number;
    duration: string;
}

export const defaultVideo: Video = {
    _id: null,
    video_id: "",
    title: "",
    description: "",
    tags: "",
    total_views: 0,
    likes: 0,
    dislikes: 0,
    current_viewers: 0,
    joining_viewers: 0,
    leaving_viewers: 0,
    published_at: "",
    comment_count: 0,
    duration: "",
};
