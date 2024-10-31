
"use client"
export default function LoginForm() {
  return (
    <form className="mt-8 w-64 flex flex-col">
    <input autoFocus
           className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
           id="email" placeholder="Telefone, nome de usuário ou email" type="text"/>
    <input autoFocus
           className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
           id="password" placeholder="Senha" type="password"/>
    <button className=" text-sm text-center bg-blue-300  text-white py-1 rounded font-medium">
        Entrar
    </button>
</form>)
}
