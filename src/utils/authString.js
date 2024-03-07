import MD5 from "crypto-js/md5";
import { AUTH_PASSWORD } from "../constants/api";

let now = new Date();
let year = now.getUTCFullYear();
let month = ('0' + (now.getUTCMonth() + 1)).slice(-2);
let day = ('0' + (now.getUTCDate())).slice(-2);
let timestamp = year + month + day;

let authString = MD5(`${AUTH_PASSWORD}_${timestamp}`).toString();
//console.log(authString)

export { authString };
  


