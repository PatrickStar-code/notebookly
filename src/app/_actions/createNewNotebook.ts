"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { FormDataNewNotebook } from "../_components/dialogNewNotebook";
import { revalidatePath } from "next/cache";

export default async function CreateNewNotebook(data: FormDataNewNotebook) {
    const session = await auth();

    if (!session) {
        return null;
    }

    const notebook = await db.notebookModel.create({
        data: {
            title: data.title,
            userId: session.user?.id as string,
            image: data.image || "",
        },
    });
    revalidatePath("/Main");
    return notebook;
}
