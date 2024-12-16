import React from "react";

export default function NotesPage({ params }: { params: { id: string } }) {
  return <div>NotesPage {params.id}</div>;
}
