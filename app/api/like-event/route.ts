export async function POST(req: Request) {
    req.json().then(d => {
        console.log(d.id);
        console.log(d.value);
    }).catch(e => { console.log(e) });

    return 200;
}