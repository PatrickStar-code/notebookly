"use server"

import db from "@/lib/db";

import { FormDataRegister } from "@/app/_components/registerForm";
import { redirect } from "next/navigation";

export default async function registerUser(data: FormDataRegister) {
    const name = data.user;
    const email = data.email;
    const password = data.password;

    const user = await db.user.create({ data: { name, email, password } }).catch(console.log);

    if (!user) throw new Error("Erro ao cadastrar o usuário.");

    redirect("/");

}