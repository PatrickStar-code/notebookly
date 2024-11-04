"use client";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { easeIn } from "framer-motion/dom";
import { useRouter } from 'next/navigation'


const schema = z.object({
  email: z
    .string()
    .min(1, { message: "O email deve ser informado." })
    .email("Este email é inválido."),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
    const router = useRouter()

    const [errorToasts, setErrorToasts] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Submit = async (data: FormData) => {
    try {
        const validatedData = await schema.parseAsync(data);
        console.log("Dados validados:", validatedData);

        reset();

        if(data.email === "teste@gmail.com" && data.password === "123456") {
            console.log("Logado com sucesso!");
            router.push('/Main')
        }

        setErrorToasts([]);
      } catch (error) {
        
      }
  };

  return (
    <form className="mt-8 w-64 flex flex-col" onSubmit={handleSubmit(Submit)}>
      <input
        autoFocus
        className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
          errors.email ? "border-red-500" : "border-black"
        }`}
        id="email"
        {...register("email")}
        placeholder="Email"
        type="text"
        required
      />
      <input
        className={`text-xs w-full mb-4 bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
          errors.password ? "border-red-500" : "border-black"
        }`}
        id="password"
        placeholder="Senha"
        type="password"
        {...register("password")}
        required
      />
      <button className="text-sm text-center bg-blue-200 py-2 rounded-[0.4em] border-2 border-black font-extrabold text-black shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]">
        Entrar
      </button>
      
      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      ) }

      {errors.password && (
        <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
      ) }
</form>

  );
}
