interface Http {
    get(url: string, config?: Partial<Config>): Promise<any>

    post(url: string, config?: Partial<Config>): Promise<any>
}

type Config = {
    method: 'GET' | 'POST',
    body: string,
    headers: {
        'content-type': string
        'Authorization': string
    }
}