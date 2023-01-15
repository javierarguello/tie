import { GetStaticProps } from 'next'
import { getPostsList } from "../services/PostsService";
import { IPostEntry } from "@/models/posts";
import { PostEntry } from "@/components/PostEntry";

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPostsList();
  return {
    props: {
      posts: posts
    },
  }
}

export default function Home({ posts }: { posts: IPostEntry[] }) {
  return (
    <div className="flex flex-col items-start w-full">
      <PostEntry post={{
        id: "offices",
        name: "Consulta los últimos Lotes de TIE",
        description: "Consulta aquí los últimos lotes de TIE disponibles en las comisarías",
        route: "/offices"
      }} />
      {posts.map(post =>
        <PostEntry key={post.id} post={post} />
      )}
    </div>
  )
}
