import { rootPath } from './../utils/path-geneartor';
import OpenAiLLMImpl from "../services/llm/openAiLLM-impl";
import PineconeProxyImpl from "../services/pinecone/pinecone-impl";
const fs = require('fs');

const query = async (ctx: any) => {

  const openAiLLM = new OpenAiLLMImpl()
  const pineconeProxy = new PineconeProxyImpl()

  const query = ctx.request.body.query;
  const vector = await openAiLLM.embedding(query);
  const dataSets = await pineconeProxy.query(vector);
  const context = fs.readFileSync(`${rootPath}/data/${dataSets[0].key}.md`, 'utf8')
  const prompt = `
    You are a QA bot. \n
    You cannot access any URL you found.\n
    You can only answer the question:\n
    """${query}""" \n
    according to the context: \n
    """${context}""" \n
    Just give me the answer in Chinese.\n
    If you don't know the answer, just say "I don't know".\n
  `;
  const { response } = await openAiLLM.generateResponse(JSON.stringify(prompt));
  ctx.body = response;
}

export default query