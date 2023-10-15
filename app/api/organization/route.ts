import { NextResponse } from 'next/server';
import { getOneFromDB, postToDB, updateDB, deleteOneFromDB } from '../db';

export async function GET(req: Request) {
    return NextResponse.json(req.json().then(d => {
        getOneFromDB("organizations", d.orgID).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) }));
}

export async function POST(req: Request) {
    req.json().then(d => {
        postToDB("organizations", d).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

export async function PUT(req: Request) {
    req.json().then(d => {
        updateDB("organizations", d.orgID, d.body).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

export async function DELETE(req: Request) {
    req.json().then(d => {
        deleteOneFromDB("organizations", d.orgID).catch(e => { console.log(e); });
    }).catch(e => { console.log(e) });
}

