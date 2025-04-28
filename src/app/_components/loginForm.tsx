"use client";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import Login from "../_actions/login";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "O email deve ser informado." })
    .email("Este email é inválido."),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type FormDataLogin = z.infer<typeof schema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Submit = async (data: FormDataLogin) => {
    const isDark = document.documentElement.classList.contains("dark");

    try {
      setLoading(true);

      const validatedData = await schema.parseAsync(data);

      const response = await Login(validatedData);

      if (response?.error) {
        toast.error(response.error, {
          position: "bottom-left",
          theme: isDark ? "dark" : "light",
        });
        return;
      }

      toast.success("Login efetuado com sucesso!", {
        theme: isDark ? "dark" : "light",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error instanceof z.ZodError
          ? error.errors.map((err) => err.message).join(", ")
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
        <button
          disabled={loading}
          className="text-sm text-center bg-blue-200 py-2 rounded-[0.4em] border-2 border-black font-extrabold text-black shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] disabled:bg-blue-100 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
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
