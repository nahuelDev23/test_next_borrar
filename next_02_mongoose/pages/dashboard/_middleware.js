import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req) {
    const basicAuth = req.headers.get('cookie')
    const KEY = '123123124124124123423'
    if (basicAuth) {

        const token = basicAuth.split('=')[1]

        const decode = jwt.verify(token, KEY)
        console.log(decode);
        if (decode.admin) {
            return NextResponse.next()
        }
        
    }
    return NextResponse.redirect('/')
}