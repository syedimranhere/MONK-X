import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const authpOptions = {
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
                fullname: { label: "fullname", type: "password" },
                username: { label: "username", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await prisma.users.findFirst({
                    where: {
                        email: credentials.email
                    }
                })

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    if (user.provider && user.provider === "google") {
                        throw new Error("You are already signed in with google")
                    }
                    const correct = await bcrypt.compare(credentials?.password, user?.password)
                    if (!correct) throw new Error("Incorrect password")
                    console.log(user)

                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(' i am called')
            if (account?.provider === "google") {
                // create into DB
                const exists = await prisma.users.findFirst({
                    where: {
                        email: user.email
                    }
                })

                console.log(user)

                if (!exists) {
                    await prisma.users.create({
                        data: {
                            fullname: user.name,
                            email: user.email,
                        }

                    })
                }
            }




            return true;
        },
        async redirect({ url, baseUrl }) {
            return url;
        },
        async jwt({ token, user }) {
            if (user) {
                token.name = user.fullname
                token.email = user.email
                return token
            }
            return token
        },
        async session({ session, token, user }) {

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authpOptions);
export { handler as GET, handler as POST };