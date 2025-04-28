"use seerver";

import db from "@/lib/db";

export default async function getAllNotes(userId: string) {

    const notebooks = await db.notebookModel.findMany({
        where: {
            userId: userId,
        },
    });



    const notes = await db.noteModel.findMany({
        where: {
            notebookId: {
                in: notebooks.map((notebook) => notebook.id),
            },
        },
    });


    return notes;
}