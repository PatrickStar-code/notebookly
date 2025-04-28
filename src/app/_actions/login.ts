/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { FormDataLogin } from "../_components/loginForm";

export default async function login(formData: FormDataLogin) {
    const email = formData.email;
    const password = formData.password;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // <- muito importante
        });


    } catch (e) {
        return { success: false, error: "Erro desconhecido" };
    }

    redirect("/Main");
}
