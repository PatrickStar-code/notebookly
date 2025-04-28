import LoginForm from "./_components/loginForm";
import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DialogResetPassword from "./_components/dialogResetPassword";

export default async function Login() {
  const session = await auth();
  if (session) {
    return redirect("/Main");
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Coluna da Imagem */}
        <div className="hidden lg:flex justify-center items-center">
          {/* Imagem aqui */}
          <Spline scene="https://prod.spline.design/HN-AKwGLre7mON3R/scene.splinecode" />
        </div>

        {/* Coluna do Formulário */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white border border-gray-300 w-80 py-8 flex flex-col items-center ">
            <Image src="/logo.png" alt="Imagem" width={240} height={240} />
            <LoginForm />

            <div className="flex justify-evenly items-center space-x-2 w-full mt-4">
              <span className="bg-gray-300 h-px flex-grow"></span>
            </div>

            <DialogResetPassword
              trigger={
                <p className="text-[.8rem] text-blue-900 text- hover:underline mt-4 cursor-pointer">
                  Esqueceu a senha?
                </p>
              }
            />
          </div>

          <div className="bg-white border border-gray-300 text-center text-black w-80 py-4">
            <span className="text-sm">Não tem uma conta? </span>
            <Link
              href={"/register"}
              className="text-blue-500 text-sm font-semibold cursor-pointer"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
