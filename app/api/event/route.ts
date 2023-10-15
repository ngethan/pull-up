import { NextResponse } from 'next/server';
import { getOneFromDB, postToDB, updateDB, deleteOneFromDB } from '../db';

export async function GET(req: Request) {
    return NextResponse.json(req.json().then(d => {
        getOneFromDB("events", d.eventID).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) }));
}

export async function POST(req: Request) {
    req.json().then(d => {
        postToDB("events", d).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

export async function PUT(req: Request) {
    req.json().then(d => {
        updateDB("events", d.eventID, d.body).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

export async function DELETE(req: Request) {
    req.json().then(d => {
        deleteOneFromDB("events", d.eventID).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

