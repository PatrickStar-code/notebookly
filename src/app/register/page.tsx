import React from "react";
import Image from "next/image";
import RegisterForm from "../_components/registerForm";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function registerPage() {
  const session = await auth();
  if (session) {
    return redirect("/main");
  }
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Coluna da Imagem */}

        {/* Coluna do Formulário */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white border border-gray-300 w-80 py-8 flex flex-col items-center ">
            <Image src="/logo.png" alt="Imagem" width={240} height={240} />
            <RegisterForm />
          </div>

          <div className="bg-white border border-gray-300 text-center text-black w-80 py-4">
            <span className="text-sm">Ja tem uma conta? </span>
            <Link
              href={"/"}
              className="text-blue-500 text-sm font-semibold cursor-pointer"
            >
              Acessar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
