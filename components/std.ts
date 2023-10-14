export const postAPI = (route: string, body: any) => {
    console.log(JSON.stringify(body));

    return fetch(`/api${route}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}