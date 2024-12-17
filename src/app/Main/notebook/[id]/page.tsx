import getNotes from "@/app/_actions/getNotes";
import NoteCard from "@/app/_components/cardNote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UseformatDateToPortuguese from "@/app/hooks/useFormateToPortuguese";
import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import DrawnButton from "@/app/_components/drawnButton";
import { DialogNewNote } from "@/app/_components/dialogNewNote";
import { emotionTranslations } from "@/app/_constants/emotion";

export default async function NotesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getNotes(params.id);

  // Contando os sentimentos para exibir no gráfico
  const emotionCounts = data.notes.reduce(
    (acc: Record<string, number>, note) => {
      acc[note.Emotion] = (acc[note.Emotion] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Caderno */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center font-edu">
          Caderno {data.notebook?.title}
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mt-2 font-edu">
          Criado em:{" "}
          {UseformatDateToPortuguese(data.notebook?.createdAt as Date)}
        </p>
        <DialogNewNote
          NoteBookId={data.notebook?.id as string}
          trigger={
            <div>
              <DrawnButton
                variant="outline"
                className="lg:flex lg:fixed hidden items-center gap-2 top-12 right-8 z-40"
              >
                Criar Nota <Plus size={16} />
              </DrawnButton>
              <DrawnButton
                variant="outline"
                className="fixed flex lg:hidden items-center py-[0.5rem] px-[0.5rem] right-8 top-12 z-40 rounded-full"
              >
                <Plus size={16} />
              </DrawnButton>
            </div>
          }
        />
      </div>

      {/* Seção de Sentimentos */}
      {data.notes.length > 0 && (
        <Card className="bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Distribuição de Sentimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 justify-center">
            {Object.entries(emotionCounts).map(([emotion, count]) => (
              <div
                key={emotion}
                className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2 w-36"
              >
                {/* Emote acima */}
                <span className="text-3xl">
                  {
                    emotionTranslations[
                      emotion as keyof typeof emotionTranslations
                    ].split(" ")[0]
                  }
                </span>
                {/* Texto abaixo */}
                <span
                  className={`capitalize text-lg font-medium text-center ${
                    count > 0
                      ? "text-gray-800 dark:text-gray-100"
                      : "text-gray-400"
                  }`}
                >
                  {emotionTranslations[
                    emotion as keyof typeof emotionTranslations
                  ]
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </span>
                {/* Porcentagem */}
                <span
                  className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                    count > 0
                      ? "bg-blue-500 text-white"
                      : "bg-gray-400 text-gray-200"
                  }`}
                >
                  {Math.round((count / data.notes.length) * 100)}%
                </span>
                {/* Contagem de notas */}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {count} nota{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Seção de Notas */}
      {data.notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {data.notes.map((note) => (
            <NoteCard {...note} key={note.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <img
            src="/images/no-notes.gif"
            alt="No notes available"
            className="w-48 h-48 mb-4"
          />
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-500">
            Nenhuma nota encontrada.
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Comece criando uma nova nota para este caderno!
          </p>
          <div className="mt-6">
            <DialogNewNote
              NoteBookId={data.notebook?.id as string}
              trigger={
                <DrawnButton
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  Criar Nota <Plus size={18} />
                </DrawnButton>
              }
            />
          </div>
        </div>
      )}

      {/* Toast para Notificações */}
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
    </div>
  );
}
