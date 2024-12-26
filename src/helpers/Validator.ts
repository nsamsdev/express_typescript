import ValidationRules from "./ValidationRules.js";
import { StatusCodes } from "./StatusCodes.js";
import * as V from "email-validator";
import CustomError from "./CustomError.js";

import { ValidationRuleData } from "./types.js";

export default class Validator {
  private rules: ValidationRules[];
  private data: ValidationRuleData;

  constructor(
    validationData: ValidationRules[],
    dataToCheck: ValidationRuleData
  ) {
    if (!Array.isArray(validationData)) {
      throw new CustomError(
        "expecting argument one to be an array",
        StatusCodes.BAD_REQUEST
      );
    }

    for (let i = 0; i < validationData.length; i++) {
      if (!(validationData[i] instanceof ValidationRules)) {
        throw new CustomError(
          "All validation entries must be instances of ValidationRules class",
          StatusCodes.SERVER_ERROR
        );
      }
    }

    this.rules = validationData;
    this.data = dataToCheck;
    this.run();
  }

  run() {
    for (let i = 0; i < this.rules.length; i++) {
      const name: string = this.rules[i].getName();
      const display: string = this.rules[i].getDisplayName();
      const max: number = this.rules[i].getMaxLength();
      const min: number = this.rules[i].getMinLength();
      const type: string = this.rules[i].getType();

      let paramData: ValidationRuleData;

      if (typeof this.data == "undefined") {
        throw new CustomError(
          `${display} is required but not presented`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (this.rules.length > 1) {
        if (typeof this.data == "object") {
          paramData = this.data[name];
        }
      } else {
        paramData = this.data;
      }

      if (typeof paramData == "undefined") {
        throw new CustomError(
          `${display} is required but not presented`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (type != "email" && typeof paramData != type) {
        throw new CustomError(
          `Expecting data type of ${type}, for field ${display}`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (type == "email") {
        if (!V.validate(paramData as string)) {
          throw new CustomError("Invalid email", StatusCodes.BAD_REQUEST);
        }
      }

      let checkValueLength = null;

      switch (type) {
        case "string":
          checkValueLength = (paramData as string).length;
          break;
        case "number":
          checkValueLength = paramData.toString().length;
          break;
        case "email":
          checkValueLength = (paramData as string).length;
          break;
        default:
          throw new CustomError(
            "failed to set param length",
            StatusCodes.SERVER_ERROR
          );
      }

      if (checkValueLength > max) {
        throw new CustomError(
          `field ${display} length must be less than ${max}`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (checkValueLength < min) {
        throw new CustomError(
          `field ${display} length must be more than ${min}`,
          StatusCodes.BAD_REQUEST
        );
      }
    }
  }
}
