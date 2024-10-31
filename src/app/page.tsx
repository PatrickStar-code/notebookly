import LoginForm from "./components/loginForm"
import Image from "next/image"
import Spline from '@splinetool/react-spline/next';


export default function Login() {
  return (
<div className="h-screen bg-gray-50 flex justify-center items-center">
  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
    {/* Coluna da Imagem */}
    <div className="hidden lg:flex justify-center items-center">
      {/* Imagem aqui */}
      <Spline
        scene="https://prod.spline.design/HN-AKwGLre7mON3R/scene.splinecode" 
        width={300}
        height={300}
      />
      
    </div>

    {/* Coluna do Formulário */}
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white border border-gray-300 w-80 py-8 flex flex-col items-center">
      <Image src="/logo.png" alt="Imagem" width={240} height={240} />
        <LoginForm />

        <div className="flex justify-evenly items-center space-x-2 w-full mt-4">
          <span className="bg-gray-300 h-px flex-grow"></span>
          <span className="uppercase text-xs text-gray-400 font-semibold">ou</span>
          <span className="bg-gray-300 h-px flex-grow"></span>
        </div>

        <button className="mt-4 flex items-center justify-center text-xs text-blue-900 font-semibold">
          <span>Entrar com o Google</span>
        </button>

        <a className="text-xs text-blue-900 mt-4 cursor-pointer">Esqueceu a senha?</a>
      </div>

      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Não tem uma conta? </span>
        <a className="text-blue-500 text-sm font-semibold cursor-pointer">Cadastre-se</a>
      </div>
    </div>
  </div>
</div>


  );
}
