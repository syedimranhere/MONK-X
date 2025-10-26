import { NextResponse, NextRequest } from "next/server";

import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

    try {
        console.log("reached here")
        const { email, password, fullname, username } = await req.json();
        console.log(email, "HERE ")
        const exists = await prisma.users.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (exists) {
            if (exists.email === email) return NextResponse.json({ error: "Email already registered" });
            else return NextResponse.json({ error: "Username already exists" });
        }

        const hashed = await bcrypt.hash(password, 12)
        await prisma.users.create({
            data: {
                email: email,
                password: hashed,
                fullname: fullname,
                username: username
            }
        })


        return NextResponse.json({
            sucess: true
        })

    } catch (error) {
        return NextResponse.json({ error: error.message });

    }

}
