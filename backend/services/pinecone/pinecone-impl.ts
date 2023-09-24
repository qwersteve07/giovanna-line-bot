import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from "dotenv";
dotenv.config();

const pinecone = new Pinecone({
  environment: process.env.PINECONE_ENVIRONMENT || '',
  apiKey: process.env.PINECONE_API_KEY || '',
});
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME || '');

class PineconeProxyImpl implements PineconeProxy {
  async list() {
    return await pinecone.listIndexes()
  }

  async query(vector: number[]): Promise<{ key: string; }[]> {

    const queryRequest = {
      vector: vector,
      topK: 5,
      includeValues: true,
      includeMetadata: true,
    };

    const response = await pineconeIndex.query(queryRequest);
    const matches = response.matches!.map((match) => {
      return {
        key: match.id,
      };
    });
    return matches;
  }

  async upsert(id: string, vector: number[]): Promise<void> {
    const requestParams = [{
      id: id,
      values: vector,
    }];
    await pineconeIndex.upsert(requestParams)
    return
  }
}

export default PineconeProxyImpl;
