import { Client, TablesDB, ID } from "node-appwrite";
import { PinataSDK } from "pinata";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
  const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;

  const databases = new TablesDB(client);
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
  });

  try {
    const userId = req.headers["x-appwrite-user-id"];
    if (!userId) {
      return res.json({ success: false, message: "Unauthorized" }, 401);
    }

    const payload = JSON.parse(req.body || "{}");
    const { html, title, content, theme, font, watermark, paperId } = payload;

    if (!html || !title) {
      return res.json(
        { success: false, message: "Missing required fields" },
        400,
      );
    }

    log(`Uploading to IPFS for user ${userId}`);
    const blob = new Blob([html], { type: "text/html" });
    const file = new File([blob], `${title}.html`, { type: "text/html" });

    const upload = await pinata.upload.public.file(file, {
      metadata: {
        name: file.name,
        keyvalues: {
          userId,
        },
      },
    });
    const cid = upload.cid;
    const gateway = `${process.env.PINATA_GATEWAY}/ipfs/${cid}`;

    log(`Successfully uploaded to IPFS: ${cid}`);

    const paperData = {
      title,
      content: content || "",
      htmlContent: html,
      theme: theme || "paper",
      font: font || "serif",
      watermark: watermark !== undefined ? watermark : true,
      status: "published",
      ipfsCid: cid,
      ipfsGateway: gateway,
      userId: userId,
    };

    let paper;
    if (paperId) {
      log(`Updating paper ${paperId}`);

      paper = await databases.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: paperId,
        data: paperData,
      });
    } else {
      log(`Creating new paper`);
      paper = await databases.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(),
        data: paperData,
      });
    }

    log(`Paper saved with ID: ${paper.$id}`);

    return res.json({
      success: true,
      cid,
      gateway,
      paperId: paper.$id,
      message: "Paper published successfully",
    });
  } catch (err) {
    error("Upload error:", err.message, err.stack);
    return res.json(
      { success: false, message: err.message || "Upload failed" },
      500,
    );
  }
};
