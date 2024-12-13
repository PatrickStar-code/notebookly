"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FormDataNewNote } from "../_components/dialogNewNote";
import { NoteEmotion } from "@prisma/client";

export default async function CreateNewNote(data: FormDataNewNote & { NotebookId: string }) {
    const session = await auth();

    if (!session) {
        return null;
    }

    const emotion = NoteEmotion[data.NoteEmotion as keyof typeof NoteEmotion] || NoteEmotion.NEUTRAL; // Padrão 'NEUTRAL'



    const notebook = await db.noteModel.create({
        data: {
            title: data.title,
            image: data.image || "",
            Emotion: emotion,
            notebookId: data.NotebookId,
        },
    });

    revalidatePath("/main");
    return notebook;
}
