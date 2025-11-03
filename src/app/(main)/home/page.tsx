"use client"
import { useSession } from "next-auth/react"

export default function Home() {
    const { data: session } = useSession()
    return (
        <div className="min-h-screen bg-black text-white ">
            <h1>imran here</h1>

        </div>
    )
}
