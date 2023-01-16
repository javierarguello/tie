import { GetStaticProps, GetStaticPaths } from "next";
import React from 'react'
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getPostsList, getPostContent, getPostEntryById } from "../../services/PostsService";
import Link from "next/link";

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
            <div className="flex flex-row space-x-2 items-center">
                <Link href="/">
                    <ArrowLeftCircleIcon className="h-10" />
                </Link>
                <div className="text-2xl font-extrabold">{name}</div>
            </div>
            <div className="leading-10"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <div className="mt-4 flex flex-row space-x-2 items-center">
                <Link href="/">
                    <ArrowLeftCircleIcon className="h-10" />
                </Link>
                <span>Volver</span>
            </div>
        </div>
    )
}

export default Post;
