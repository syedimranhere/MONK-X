"use client"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import axios from "axios"
export default function Home() {
    const { data: session } = useSession()
    const [loading, setloading] = useState(Boolean)
    const [image, setimage] = useState()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setimage(e.target.files[0])

    }
    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setloading(true)
        const url = URL.createObjectURL(image!)
        console.log(url)
        try {
            //getting presigned url
            const response1 = await axios.post("/api/s3", {
                filename: image?.name
            })
            console.log(response1)
            // now we have a url so upload to s3
            const aws_url = response1.data.url
            const response2 = await axios.put(aws_url, {
                image

            })
            console.log(response2)

        } catch (error) {
            console.log(error)

        }
        setloading(false)

    }

    return (
        <div className="min-h-screen bg-black text-white ">
            <div className="flex flex-col">
                <p>Signed in as :</p>
                <p className="mb-4">{session?.user.fullname!} {session?.user.email!}</p>
                {/* <p>{session?.user}</p> */}

                <img src={session?.user?.image} alt="profile" className="w-10 h-13 rounded-lg" />
                <form
                    onSubmit={handleUpload}
                    className="flex flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-sm bg-white"
                >
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-100 transition">
                        <span className="text-blue-600 font-medium">{image ? image.name : "Choose an image"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </form>

            </div>

        </div >
    )

}

