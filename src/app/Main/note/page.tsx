import getAllNotes from "@/app/_actions/getAllNotes";
import { NoteModel } from "@prisma/client";

import NoteContent from "@/app/_components/noteContent";

export default async function AllNotesPage() {
  const data: NoteModel[] = await getAllNotes();
  return <NoteContent data={data} />;
}
