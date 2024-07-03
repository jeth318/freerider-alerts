import * as Hashes from "jshashes";
const MD5 = new Hashes.MD5();

export const genHash = (value) => {
  return MD5.hex(JSON.stringify(value));
};
