"use server";

import db from "@/lib/db";
import { FormDataRegister } from "@/app/_components/registerForm";
import { redirect } from "next/navigation";

export default async function registerUser(data: FormDataRegister) {
    const { user: name, email, password, image } = data;

    const existingUser = await db.userModel.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { success: false, error: "Email já cadastrado." };
    }

    const user = await db.userModel.create({
        data: { name, email, password, image },
    });

    if (!user) {
        return { success: false, error: "Erro ao cadastrar o usuário." };
    }

    redirect("/");
}
