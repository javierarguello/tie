import { IPostEntry } from "@/models/posts";
import Link from "next/link";
import React from 'react'
import { HorizontalRule } from "./HorizontalRule";

export const PostEntry = ({ post }: { post: IPostEntry }) => {
    return (
        <>
            <div className="flex flex-row space-x-5 text-gray-700">
                <div className="text-blue-800 w-32 md:w-[220px] flex-shrink-0">
                    <Link href={post.route}>{post.name}</Link>
                </div>
                {post.description &&
                    <div className="flex flex-col space-y-3" dangerouslySetInnerHTML={{ __html: post.description }} />
                }
            </div>
            <HorizontalRule />
        </>
    )
}
