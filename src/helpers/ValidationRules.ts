

import { StatusCodes } from "./StatusCodes.js";

import CustomError from "./CustomError.js";

export default class ValidationRules {

  private _name  : string;
  private _displayName : string;
  private _type : string;
  private _min : number;
  private _max : number;


  constructor(nameInRequest: string, outputName: string, type : string, minLength : number, maxLength : number) {
    if (
      typeof nameInRequest != "string" ||
      typeof outputName != "string" ||
      typeof type != "string"
    ) {
      throw new CustomError(
        "Expecting string values for name, display and type",
        StatusCodes.SERVER_ERROR
      );
    }

    if (typeof minLength != "number" || typeof maxLength != "number") {
      throw new CustomError(
        "min and max need to be numbers",
        StatusCodes.SERVER_ERROR
      );
    }

    if (!this._getAllowedTypes().includes(type)) {
      throw new CustomError(
        "Allowd types are: ",
        StatusCodes.SERVER_ERROR
      );
    }

    this._name = nameInRequest;
    this._displayName = outputName;
    this._type = type;
    this._min = minLength;
    this._max = maxLength;
  }

  _getAllowedTypes() : string[] {
    return ["string", "number", "email"];
  }

  getName() : string {
    return this._name;
  }

  getType() : string {
    return this._type;
  }

  getDisplayName() : string {
    return this._displayName;
  }

  getMaxLength() : number {
    return this._max;
  }

  getMinLength() : number {
    return this._min;
  }
}
