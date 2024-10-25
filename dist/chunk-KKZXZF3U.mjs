// src/utils/getHeaderData.ts
import cookie from "cookie";
import jwt from "jsonwebtoken";
function getUserId(headers) {
  const cookies = cookie.parse(headers.cookie || "");
  const token = cookies.a54;
  if (!token)
    return void 0;
  const decoded = jwt.decode(token);
  return decoded.id;
}
function getProducerId(headers) {
  const cookies = cookie.parse(headers.cookie || "");
  const token = cookies.a54;
  if (!token)
    return void 0;
  const decoded = jwt.decode(token);
  console.log(decoded, "decoded");
  return decoded.producerId;
}

export {
  getUserId,
  getProducerId
};
