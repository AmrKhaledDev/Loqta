import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/Zod_Schemas/Auth_Schemas/Login.schema";
import bcrypt from "bcryptjs";
//  ==================================================
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.BETTER_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(data) {
        try {
          const validation = LoginSchema.safeParse(data);
          if (!validation.success) return null;
          const existingUser = await prisma.user.findUnique({
            where: {
              email: validation.data.email,
            },
          });
          if (!existingUser) return null;
          const passwordMatch = await bcrypt.compare(
            validation.data.password,
            existingUser.password,
          );
          const { password: _, ...userWithoutPassword } = existingUser;
          if (!passwordMatch) return null;
          return userWithoutPassword;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
