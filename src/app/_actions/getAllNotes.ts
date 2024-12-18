"use seerver";

import db from "@/lib/db";

export default async function getAllNotes() {
    const notes = await db.noteModel.findMany({});
    return notes;
}