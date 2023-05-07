import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const formData = await request.formData();
    const code = formData.get('execute');
    try {
        const result = await prisma.$queryRawUnsafe(String(code));
        console.log(result);
        if (JSON.stringify(result) == "[]") {
            return new Response("No results. Success");
        }
        return new Response(JSON.stringify(result));
    } catch (e) {
        if (e instanceof Error) {
            if (e instanceof PrismaClientKnownRequestError && e.meta)  {
                return new Response(
                    e.meta.message,
                    { status: 500 },
                );
            }
            return new Response(
                e.message,
                { status: 500 },
            );
        }
        return new Response (
            'Unknown error',
            { status: 500 },
        );
    }
}
