import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ body: "Hello World!" });
}

export async function POST(req: Request) {
    req.json().then(d => {
        fetch('', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(d)
        }).then(res => res.json()).then(data => console.log(data))
          .catch(e => console.log(e));
    }).catch(e => { console.log(e) });
}