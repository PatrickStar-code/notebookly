"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function DeleteNote(noteId: string) {
    const note = await db.noteModel.delete({
        where: {
            id: noteId,
        },
    });
    revalidatePath("/Main");
    return note;
}
