
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authpOptions } from "../api/auth/[...nextauth]/route"
import SidebarLeft from "../components/leftsidebar/sidebar"
export default async function layout({ children }: any) {
    const session = await getServerSession(authpOptions)
    if (!session?.user) {
        redirect("/")
    }


    return (
        <div className="grid grid-cols-[14rem_1fr] bg-black min-h-screen">
            <SidebarLeft />
            <main className=" text-white px-4 mt-3">{children}</main>
        </div>

    )
}