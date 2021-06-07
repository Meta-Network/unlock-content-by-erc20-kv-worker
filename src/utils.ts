export const ResponseWithJson = 
    (obj: Record<string, any>, 
        status?: number,
        headers?: HeadersInit,
    ) => new Response(
        JSON.stringify(obj),
        { 
            status,
            headers: {
                ...headers,
                "content-type": "application/json;charset=UTF-8"
            }
        }
    )