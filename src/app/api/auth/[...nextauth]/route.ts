import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authpOptions = {
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authpOptions);
export { handler as GET, handler as POST };