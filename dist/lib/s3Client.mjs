// src/lib/s3Client.ts
import { S3Client } from "@aws-sdk/client-s3";
var s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
export {
  s3
};
