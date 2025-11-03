
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authpOptions } from "../api/auth/[...nextauth]/route"
import Sidebar from "../components/rightsidebar/sidebar"
export default async function layout({ children }: any) {
    const session = await getServerSession(authpOptions)
    if (!session?.user) {
        redirect("/")
    }

    return (
        <>
            <Sidebar />



            {children}
        </>
    )
}