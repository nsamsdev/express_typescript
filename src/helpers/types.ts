import { Request, Response } from "express";

type AppRequest = Request;

type AppResponse = Response;
type UndefinableStringNum = undefined | string | number;

type StatusCode = {
  customCode: number;
};

type UserObj = {
  id: number,
  email: string,
  isAdmin?: number,
  isActivated: number,
  createdAt?: number | Date,
  pass?: string,
  isDeleted?: number,
  save: () => void,
  adminUserId: number
};

type ValidationRuleData =
  | UndefinableStringNum
  | {
      [key: string]: UndefinableStringNum;
    };

interface SendMailInterface {
  // toEmail?: string, subject?: string, html?: string, fromEmail?: string, text?: string;
  setToEmail: (email: string) => this;
  setSubjct: (subject: string) => this;
  setHtml: (html: string) => this;
  setText: (text: string) => this;
  send: () => void;
}

type bodyRequest = {
  action?: string;
};

type ErrObj = {
  message: string,
  errCode: number
}

type ActionsMappingObj = {
  name: string;
  isProtected: boolean;
  isAdminOnly: boolean;
  httpMethod: "POST" | "GET";
  validationDataSource: ValidationRuleData;
  validationRules: () => any[];
};

type SendData = {
    status?: string
}

export {
  ValidationRuleData,
  StatusCode,
  AppRequest,
  AppResponse,
  SendMailInterface,
  bodyRequest,
  ActionsMappingObj,
  SendData,
  ErrObj,
  UserObj
};
