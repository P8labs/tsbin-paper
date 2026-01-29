import { account, functions } from "$lib/appwrite";
import { ExecutionMethod, ExecutionStatus } from "appwrite";

const FUNCTION_ID = "tsbin-paper-upload-to-ipfs";

export async function publishToIPFS(
  html: string,
  title: string,
  userId: string,
  paperData: {
    content: string;
    theme: string;
    font: string;
    watermark: boolean;
    paperId?: string;
  },
): Promise<{ cid: string; gateway: string; paperId: string }> {
  try {
    const session = await account.get();
    if (!session) {
      throw new Error("Not authenticated");
    }

    const response = await functions.createExecution({
      functionId: FUNCTION_ID,
      headers: {
        "x-appwrite-user-id": userId,
      },
      method: ExecutionMethod.POST,
      async: true,
      body: JSON.stringify({
        html,
        title,
        content: paperData.content,
        theme: paperData.theme,
        font: paperData.font,
        watermark: paperData.watermark,
        paperId: paperData.paperId,
      }),
    });

    if (response.status == ExecutionStatus.Failed) {
      throw new Error("Failed to call upload function");
    }

    const result = JSON.parse(response.responseBody);

    return {
      cid: result.cid,
      gateway: result.gateway,
      paperId: result.paperId,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to publish to IPFS");
  }
}
