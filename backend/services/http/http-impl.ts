class HttpImpl implements Http {
    async get(url: string, config: Partial<Config>): Promise<any> {
        return fetch(url, config).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }

            return res.json()
        })
    }

    async post(url: string, config: Partial<Config>): Promise<any> {
        return fetch(url, { ...config, method: 'POST' }).then(res => {
            console.log(res)
            if (!res.ok) {
                throw new Error(res.statusText)

            }

            return res.json()
        })
    }
}

export default HttpImpl