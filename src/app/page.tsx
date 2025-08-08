import prisma from "../../lib/db";
import { addPost, deletePost } from "./actions/actions";

export default async function Home() {

  const posts = await prisma.post.findMany();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <form className="flex gap-3" action={addPost}>
          <input className="p-3 bg-slate-300" type="text" placeholder="Title" name="title" />
          <button type="submit" className="p-3 bg-slate-500 text-white">Add post</button>
        </form>
        <div className="mt-10">
          <h1>All your posts</h1>
          <ol>
            {posts.map((post) => (
              <div className="flex gap-3 p-1 items-center justify-between" key={post.id}>
                <li>{post.title}</li>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="bg-red-500 text-white px-2 py-1">Delete</button></form>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
