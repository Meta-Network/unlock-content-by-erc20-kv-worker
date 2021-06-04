export const ResponseWithJson = 
    (obj: Record<string, any>, 
        headers?: HeadersInit,
        status?: number
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