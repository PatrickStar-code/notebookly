"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FormDataEditNote } from "../_components/dialogEditNote";
import { NoteEmotion } from "@prisma/client";

export default async function EditNote(data: FormDataEditNote & { NotebookId: string }) {
    const session = await auth();

    if (!session) {
        return null;
    }

    const emotion = NoteEmotion[data.NoteEmotion as keyof typeof NoteEmotion] || NoteEmotion.NEUTRAL;


    const notebook = await db.noteModel.update({
        data: {
            title: data.title,
            image: data.image,
            Emotion: emotion,

        },
        where: {
            id: data.NotebookId,
        },
    });
    revalidatePath("/main");
    return notebook;
}
