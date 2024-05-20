import { NextResponse } from "next/server"

export async function GET(req) {
    console.log('route.js GET');
    return NextResponse.json({name: 'John Doe'});
};