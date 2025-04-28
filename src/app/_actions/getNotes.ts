"use server";
import db from "@/lib/db";

export default async function getNotesAndNameNoteboock(noteId: string) {

    const notes = await db.noteModel.findMany({
        where: {
            notebookId: noteId,
        },
        orderBy: {
            createdAt: "desc",
        },

    });

    const notebook = await db.notebookModel.findUnique({
        where: {
            id: noteId,
        },
    });

    return { notes, notebook };

}