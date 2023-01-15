import { GetStaticProps, GetStaticPaths } from "next";
import React from 'react'
import { postId2Tile } from "@/utils/utils";
import { getPostsList, getPostContent, getPostEntryById } from "../../services/PostsService";

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPostsList()
    return {
        paths: posts.map(post => { return { params: { id: post.id } }; }),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as { id: string; };
    const post = await getPostEntryById(id);
    const htmlContent = await getPostContent(id);
    return {
        props: {
            id: id,
            name: post?.name,
            htmlContent: htmlContent
        }
    }
};

const Post = ({ id, name, htmlContent }: { id: string; name: string; htmlContent: string; }) => {
    return (
        <div>
            <div className="text-2xl font-extrabold">{name}</div>
            <div className="leading-10"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    )
}

export default Post;
