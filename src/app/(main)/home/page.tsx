"use client"
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function () {
    const { data: session } = useSession();
    console.log(session)

    return (
        <div className="flex flex-col min-h-screen bg-black text-blue-800 items-center justify-center">

            <p >This is Home</p>
            <p>You are signed in as {session?.user?.name || session?.user?.email}</p>
            <br />
            <button className="border-amber-500 bg-red-500" onClick={() => signOut()}>SignOut</button>
        </div>)
}


