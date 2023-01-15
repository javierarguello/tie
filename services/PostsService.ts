import { IPostEntry } from "@/models/posts";
import { getFirstParagraph, postId2Tile, removeHtmlFromContent } from "@/utils/utils";
import fsPromises from 'fs/promises'
import path from 'path'

let posts: IPostEntry[] = [];

export const getPostsList = async () => {
    if (posts.length > 0) {
        return posts;
    }
    const files = await fsPromises.readdir(path.join(process.cwd(), "./data/posts"));
    posts = await Promise.all(files.map(file => {
        return {
            id: file.split(".")[0],
        };
    }).map(async post => {
        return {
            ...post,
            route: `/posts/${post.id}`,
            name: postId2Tile(post.id),
            description: removeHtmlFromContent(getFirstParagraph(await getPostContent(post.id)))
        };
    })) as IPostEntry[];

    return posts;
}

export const getPostEntryById = async (id: string) => {
    const posts = await getPostsList();
    return posts.find(post => post.id === id);
}

export const getPostContent = async (id: string) => {
    const htmlContent = await fsPromises.readFile(path.join(process.cwd(), `./data/posts/${id}.html`));
    return htmlContent.toString("utf-8");
}