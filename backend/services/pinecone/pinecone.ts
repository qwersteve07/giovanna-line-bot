interface PineconeProxy {
    list(): Promise<any>
    query(vector: number[]): Promise<{ key: string }[]>;
    upsert(id: string, vector: number[]): Promise<void>;
}