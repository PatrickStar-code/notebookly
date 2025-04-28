"use server"

import db from "@/lib/db";

export default async function getDescInfo(Id: string) {


    const notebooks = await db.notebookModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        where: { userId: Id },

    });

    console.log("notebooks", notebooks);

    const notes = await db.noteModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        where: {
            notebookId: {
                in: notebooks.map((notebook) => notebook.id),
            }
        }
    });



    return { notes, notebooks };

}