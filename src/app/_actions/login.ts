"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { FormDataLogin } from "../_components/loginForm";

export default async function login(formData: FormDataLogin) {
    const email = formData.email;
    const password = formData.password;

    try {
        await signIn("credentials", {
            email,
            password,
        });
    } catch (e) {
        console.error(e);
        if (e instanceof AuthError && e.type === "CredentialsSignin") {
            throw new Error("Credenciais inválidas");
        }
    }

    redirect("/main");
}
