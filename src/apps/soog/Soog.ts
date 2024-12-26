

import { StatusCodes } from "../../helpers/StatusCodes.js";
import AppResponser from "../../helpers/AppResponser.js";
import SendMail from "../../helpers/SendMail.js";
import SoogMessages from "./SoogMessages.js";
import User from "./db/models/User.js";
import Token from "./db/models/Token.js";
import { MembershipLevels } from "./modules/MembershipLevels.js";
import ValidationRules from "../../helpers/ValidationRules.js";
import CustomError from "../../helpers/CustomError.js";
import { Op } from "sequelize";

import { AppRequest, AppResponse, UserObj } from "../../helpers/types.js";

import { ActionsMappingObj, ErrObj, SendData } from "../../helpers/types.js";

export default class Soog extends AppResponser {

  
  constructor(req : AppRequest, res : AppResponse) {
    super(
      res,
      req,
      new SoogMessages(),
      [User, Token],
      new SendMail(
        process.env.SOOG_SMTP_HOST as string,
        (process.env.SOOG_SMTP_PORT as unknown) as number,
        process.env.SOOG_SMTP_USER as string,
        process.env.SOOG_SMTP_PASS as string,
        process.env.SOOG_SMTP_FROM as string
      )
    );
  }


  getAppActions() : ActionsMappingObj[] | any[] {
    return [
     
    ];
  }

  run() {
    this.validate(this.getAppActions())
      .then(() => {

        const action = (this as unknown as  {
          [key: string] : () => any
        })[this.action].bind(this);

        action()
          .then((data: SendData) => {
            this.send(data, 200);
          })
          .catch((err : ErrObj) => this.sendError(err.message, err));
      })
      .catch((err) => this.sendError(err.message, err));
  }
}
