"use client";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { easeIn } from "framer-motion/dom";
import { useRouter } from "next/navigation";
import registerUser from "../register/_actions/register";
import { hashSync } from "bcrypt-ts";

const schema = z.object({
  user: z.string().min(1, { message: "O usuario deve ser informado." }),
  email: z
    .string()
    .min(1, { message: "O email deve ser informado." })
    .email("Este email é inválido."),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type FormDataRegister = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();

  const [errorToasts, setErrorToasts] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
      email: "",
      password: "",
    },
  });

  const Submit = async (data: FormDataRegister) => {
    try {
      const validatedData = await schema.parseAsync(data);
      validatedData.password = hashSync(validatedData.password, 10);
      registerUser(validatedData);

      reset();
    } catch (error) {}
  };

  return (
    <form className="mt-8 w-64 flex flex-col" onSubmit={handleSubmit(Submit)}>
      <input
        autoFocus
        className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
          errors.user ? "border-red-500" : "border-black"
        }`}
        id="usuario"
        {...register("user")}
        placeholder="Usuario"
        type="text"
        required
      />
      <input
        autoFocus
        className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
          errors.email ? "border-red-500" : "border-black"
        }`}
        id="email"
        {...register("email")}
        placeholder="Email"
        type="email"
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
        Cadastrar-se
      </button>

      {errors.user && (
        <p className="text-red-500 text-sm mt-2">{errors.user.message}</p>
      )}

      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      )}

      {errors.password && (
        <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
      )}
    </form>
  );
}
