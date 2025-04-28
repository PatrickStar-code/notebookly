"use client";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { hashSync } from "bcrypt-ts";
import { toast, ToastContainer } from "react-toastify";
import registerUser from "../_actions/register";

const schema = z.object({
  user: z.string().min(1, { message: "O usuario deve ser informado." }),
  email: z
    .string()
    .min(1, { message: "O email deve ser informado." })
    .email("Este email é inválido."),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  image: z
    .string()
    .optional()
    .refine(
      (url) => url === undefined || url === "" || /(http|https):\/\//.test(url),
      {
        message:
          "A URL precisa começar com http ou https, ou pode ser deixada em branco.",
      }
    ),
});

export type FormDataRegister = z.infer<typeof schema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const Submit = async (data: FormDataRegister) => {
    const isDark = document.documentElement.classList.contains("dark");

    try {
      setLoading(true);
      const validatedData = await schema.parseAsync(data);
      validatedData.password = hashSync(validatedData.password, 10);
      await registerUser(validatedData);
      toast.success("Cadastro efetuado com sucesso!", {
        theme: isDark ? "dark" : "light",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error instanceof z.ZodError
          ? error.errors.map((err) => err.message).join(", ") // Combina as mensagens de erro do Zod
          : error.message || "Ocorreu um erro inesperado";
      toast.error(errorMessage, {
        position: "bottom-left",
        theme: isDark ? "dark" : "light",
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <form className="mt-8 w-64 flex flex-col" onSubmit={handleSubmit(Submit)}>
        <input
          autoFocus
          className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
            errors.user ? "border-red-500" : "border-black"
          }`}
          id="usuario"
          {...register("user")}
          placeholder="Usuario*"
          type="text"
          required
        />
        <input
          autoFocus
          className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
            errors.image ? "border-red-500" : "border-black"
          }`}
          id="imagem"
          {...register("image")}
          placeholder="Image Url"
          type="text"
        />

        <input
          autoFocus
          className={`text-xs w-full mb-2  bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
            errors.email ? "border-red-500" : "border-black"
          }`}
          id="email"
          {...register("email")}
          placeholder="Email*"
          type="email"
          required
        />
        <input
          className={`text-xs w-full mb-4 bg-white px-2 py-2 rounded-[0.4em] border-2 border-black font-bold text-gray-700 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out focus:outline-none focus:shadow-[0.15em_0.15em] focus:translate-x-[-0.05em] focus:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] ${
            errors.password ? "border-red-500" : "border-black"
          }`}
          id="password"
          placeholder="Senha*"
          type="password"
          {...register("password")}
          required
        />
        <button
          disabled={loading}
          className="text-sm text-center bg-blue-200 disabled:bg-blue-100 disabled:cursor-not-allowed py-2 rounded-[0.4em] border-2 border-black font-extrabold text-black shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]"
        >
          {loading ? "Carregando..." : "Cadastrar"}
        </button>

        {errors.user && (
          <p className="text-red-500 text-sm mt-2">{errors.user.message}</p>
        )}

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
        {errors.image && (
          <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
        )}

        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
        )}
      </form>
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
