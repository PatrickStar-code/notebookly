"use server"

import db from "@/lib/db";

export default async function getDescInfo() {
    const notes = await db.noteModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5
    });

    const notebooks = await db.notebookModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5

    });

    return { notes, notebooks };

}