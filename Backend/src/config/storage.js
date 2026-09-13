import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async ({ buffer, fileName, folder = "TEAM_SYNC" }) => {
  const file = await client.files.upload({
    file: await ImageKit.toFile(Buffer.from(buffer)),
    fileName,
    folder,
  });
  return file;
};
export default uploadFile;
