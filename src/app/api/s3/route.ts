import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";



const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    // from here we are going to send the presigned url to the FE
    try {
        const { filename } = await req.json()
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: `uploads/${Date.now()}-${filename}`,
            ContentType: "image/png"
        })

        const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 5 })
        return NextResponse.json({
            url
        })
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: error.message })

    }

}   