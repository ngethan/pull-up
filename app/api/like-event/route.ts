import { updateDB } from "../db";

export async function POST(req: Request) {
    req.json().then(d => {
        updateDB("users", d.userID, d.body).then(d => {
            console.log(d);
        }).catch(e => {
            console.log(e);
        })
    }).catch(e => { console.log(e) });

    return 200;
}