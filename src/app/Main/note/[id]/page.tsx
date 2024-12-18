import Editor from "@/app/_components/editor";
import db from "@/lib/db";
import { ToastContainer } from "react-toastify";

export default async function NotesPage({
  params,
}: {
  params: { id: string };
}) {
  const note = await db.noteModel.findUniqueOrThrow({
    where: { id: params.id },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors">
        <Editor {...note} />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
