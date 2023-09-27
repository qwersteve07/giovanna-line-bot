import HttpImpl from "../http/http-impl";
import dotenv from "dotenv";
dotenv.config();

class OpenAiLLMImpl implements LLM {
    http: HttpImpl
    constructor() {
        this.http = new HttpImpl()
    }

    async embedding(content: string): Promise<number[]> {
        const requestBody = {
            input: content,
            model: "text-embedding-ada-002",
        };

        const config = {
            body: JSON.stringify(requestBody),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        };

        const response = await this.http.post("https://api.openai.com/v1/embeddings", config);
        const data = response.data;
        const embedding = data[0].embedding;
        return embedding;
    }

    async generateResponse(prompt: string): Promise<{ response: string }> {
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        };

        const config = {
            body: JSON.stringify(requestBody),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        };

        const response = await this.http.post("https://api.openai.com/v1/chat/completions", config);
        return { response: response.choices[0].message.content };
    }
}

export default OpenAiLLMImpl