"use server";

import db from "@/lib/db";

export default async function saveContentNote({ content, noteId }: { content: string, noteId: string }) {
    const note = await db.noteModel.update({
        where: { id: noteId },
        data: { content }

    });

    return note;
}