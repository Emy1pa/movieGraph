const Minio = require("minio");
const fs = require("fs");

const minioClient = new Minio.Client({
  endPoint: process.env.END_POINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
});

const MINIO_BUCKET_NAME = "movies";

async function uploadVideoToMinio(filePath, filename) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const fileStats = fs.statSync(filePath);
    const objectName = `videos/${Date.now()}-${filename}`;

    await minioClient.putObject(
      MINIO_BUCKET_NAME,
      objectName,
      fileStream,
      fileStats.size,
      { "Content-Type": "video/mp4" }
    );

    const videoUrl = `http://${process.env.END_POINT}:9000/${MINIO_BUCKET_NAME}/${objectName}`;
    return {
      url: videoUrl,
      objectName: objectName,
    };
  } catch (error) {
    console.error("Error uploading video to MinIO:", error);
    throw error;
  }
}

async function deleteVideoFromMinio(objectName) {
  try {
    await minioClient.removeObject(MINIO_BUCKET_NAME, objectName);
  } catch (error) {
    console.error("Error deleting video from MinIO:", error);
    throw error;
  }
}

module.exports = {
  uploadVideoToMinio,
  deleteVideoFromMinio,
};
