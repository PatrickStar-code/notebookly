"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FormDataEdit } from "../_components/dialogEditNotebook";

export default async function EditNotebook(data: FormDataEdit & { NotebookId: string }) {
    const session = await auth();

    if (!session) {
        return null;
    }

    const notebook = await db.notebookModel.update({
        data: {
            title: data.title,
            userId: session.user?.id as string,
            image: data.image,
        },
        where: {
            id: data.NotebookId,
        },
    });
    revalidatePath("/main");
    return notebook;
}
