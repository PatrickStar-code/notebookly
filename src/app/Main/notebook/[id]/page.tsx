import getNotes from "@/app/_actions/getNotes";
import UseformatDateToPortuguese from "@/app/hooks/useFormateToPortuguese";

export default async function NotesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getNotes(params.id);

  console.log(data);

  return (
    <div>
      <h1 className="md:text-8xl font-serif text-4xl text-center  font-edu">
        Caderno {data.notebook?.title}
      </h1>

      <h3 className="text-center font-edu text-2xl lg:text-4xl mt-2">
        Criado em: {UseformatDateToPortuguese(data.notebook?.createdAt as Date)}
      </h3>
    </div>
  );
}
