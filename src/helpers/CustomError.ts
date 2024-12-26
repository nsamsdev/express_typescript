
import { StatusCode } from "./types.js";
export default class CustomError extends Error {

    errCode: number;
    
    constructor(msg : string, StatusCode: StatusCode) {
        super(msg);
        this.errCode = StatusCode.customCode ?? 400;
    }
}