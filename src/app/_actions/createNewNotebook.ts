"use server"

import { auth } from "@/auth";
import db from "@/lib/db";

export default async function CreateNewNotebook() {
    const session = await auth();

    if (!session) {
        return null;
    }

    const notebook = await db.notebookModel.create({
        data: {
            title: "Novo Caderno",
            userId: session.user?.id as string,
            image: "",
        },
    });

    return notebook;
    console.log(notebook);

}
