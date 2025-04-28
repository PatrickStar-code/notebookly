import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./lib/db";
import { compareSync } from "bcrypt-ts";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
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
                    return null;
                }

                const user = await db.userModel.findUnique({
                    where: { email: email },
                });

                if (!user) {
                    return null;
                }

                const isPasswordCorrect = compareSync(
                    password,
                    user.password ?? ""
                );

                if (!isPasswordCorrect) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt", // "jwt" mantém a sessão no token
        maxAge: 24 * 60 * 60, // 24 horas em segundos
        updateAge: 24 * 60 * 60, // Atualiza o token a cada 24 horas
    },
    callbacks: {
        async session({ session, token }) {
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
    secret: process.env.NEXTAUTH_SECRET,
});
