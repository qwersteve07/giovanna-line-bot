interface LLM {
    embedding(content: string): Promise<number[]>;
    generateResponse(prompt: string): Promise<{ response: string }>;
}