"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function DeleteNotebook(notebookId: string) {
  const notes = await db.noteModel.deleteMany({
    where: {
      notebookId: notebookId,
    },
  });

  const notebook = await db.notebookModel.delete({
    where: {
      id: notebookId,
    },
  });

  revalidatePath("/Main");
  return { notebook, notes };
}
