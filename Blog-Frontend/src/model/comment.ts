import { Post } from "./post";

export type Comment = {
    postId: number;
    content: string;
    createdAt: Date;
    postedBy: string;
    post: Post;
}