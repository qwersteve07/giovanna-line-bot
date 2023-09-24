import OpenAiLLMImpl from "../services/llm/openAiLLM-impl";
import PineconeProxyImpl from "../services/pinecone/pinecone-impl";
import { generateUUID } from "../utils/id-generator";
import { rootPath } from "../utils/path-geneartor";
const fs = require('fs');

const upsert = async (ctx: any) => {
    const openAiLLM = new OpenAiLLMImpl()
    const pineconeProxy = new PineconeProxyImpl()

    const rawContent = ctx.request.body.input
    const embeddedData = await openAiLLM.embedding(rawContent);
    const uuid = generateUUID()
    fs.writeFile(`${rootPath}/data/${uuid}.md`, rawContent, (err: Error) => {
        if (err) {
            console.log(err);
            return
        }
    });
    await pineconeProxy.upsert(uuid, embeddedData);
    ctx.body = `embedded ${uuid} save to pinecone`
}

export default upsert