"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function DeleteNotebook(notebookId: string) {
  const notebook = await db.notebookModel.delete({
    where: {
      id: notebookId,
    },
  });
  revalidatePath("/main");
  return notebook;
}
