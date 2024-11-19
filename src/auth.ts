import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./lib/db";
import { compareSync } from "bcrypt-ts";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;
                if (!email || !password) {
                    // Retorna null caso os campos não estejam preenchidos
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: email },
                });

                if (!user) {
                    // Retorna null caso o usuário não seja encontrado
                    return null;
                }

                const isPasswordCorrect = compareSync(
                    password,
                    user.password ?? ""
                );

                if (!isPasswordCorrect) {
                    // Retorna null se a senha estiver incorreta
                    return null;
                }

                // Retorna os dados do usuário autenticado
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Adiciona o ID do usuário na sessão
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/",
        signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET, // Certifique-se de configurar isso no .env
});
