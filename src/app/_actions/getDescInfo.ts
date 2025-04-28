"use server"

import db from "@/lib/db";

export default async function getDescInfo(sessionId: string) {
    const notes = await db.noteModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        where: {

        }
    });

    const notebooks = await db.notebookModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        where: { id: sessionId },

    });

    return { notes, notebooks };

}