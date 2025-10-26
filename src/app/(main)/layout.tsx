
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authpOptions } from "../api/auth/[...nextauth]/route"

export default async function layout({ children }: any) {
    const session = await getServerSession(authpOptions)
    if (!session?.user) {
        redirect("/")
    }

    return (
        <>
            <h2 className="bg-black text-purple-900 gap-2">this is the top thing</h2>
            {children}
        </>
    )
}