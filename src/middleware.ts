import { NextRequest, NextResponse } from "next/server";



export function middleware(req: NextRequest) {
    // if (req.nextUrl.pathname === '/home') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    // return NextResponse.next();

    //--------------------------

    // Get the cookie
    const cookie = req.cookies.get('isLoggedIn');

    // Check if the cookie exists and its value is 'true'
    const isLoggedIn = cookie?.value === 'true';

    // If the user is not logged in, redirect to the home page
    // if (!isLoggedIn) {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    // If the user is logged in, allow the request to proceed
    return NextResponse.next();

}


export const config = {
    matcher : ['/home']
}