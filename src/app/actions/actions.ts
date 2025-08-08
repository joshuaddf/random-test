"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/db";

export async function addPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.create({
    data: {
      title: title,
      content: content,
      createdAt: new Date(),
    },
  });
  revalidatePath("/");
}

export async function deletePost(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  await prisma.post.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
