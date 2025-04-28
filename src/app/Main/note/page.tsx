import getAllNotes from "@/app/_actions/getAllNotes";
import { NoteModel } from "@prisma/client";

import NoteContent from "@/app/_components/noteContent";
import { auth } from "@/auth";

export default async function AllNotesPage() {
  const session = await auth();

  const data: NoteModel[] = await getAllNotes(session?.user?.id as string);
  return <NoteContent data={data} />;
}
