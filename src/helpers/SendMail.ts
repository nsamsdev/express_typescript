

import nodemailer from "nodemailer";
import { StatusCodes } from "./StatusCodes.js";

import CustomError from "./CustomError.js";

import { Transporter } from "nodemailer";

import { SendMailInterface } from "./types.js";

export default class SendMail implements SendMailInterface {

  private transporter: Transporter;
  private toEmail?: string;
  private subject?: string;
  private html?: string;
  private fromEmail: string;
  private text?: string;
   
  constructor(host : string, port : number, user : string, pass : string, from : string) {
   
    this.transporter = nodemailer.createTransport({
      host: host ?? process.env.GLOBAL_SMTP_HOST,
      port: port ?? process.env.GLOBAL_SMTP_PORT,
      secure: port == 465 ? true : false, // true for port 465, false for other ports
      auth: {
        user: user ?? process.env.GLOBAL_SMTP_USER,
        pass: pass ?? process.env.GLOBAL_SMTP_PASS,
      },
    });
    this.fromEmail = from ?? process.env.GLOBAL_SMTP_FROM_EMAIL;
  }

  setToEmail(email: string) : this {
    this.toEmail = email;
    return this;
  }

  setSubjct(subject : string)  : this{
    this.subject = subject;
    return this;
  }

  setHtml(html: string) : this {
    this.html = html;
    return this;
  }

  setText(text : string) : this {
    this.text = text;
    return this;
  }

  async send() {
    if (
      typeof this.toEmail == "undefined" ||
      typeof this.subject == "undefined" ||
      typeof this.html == "undefined"
    ) {
      throw new CustomError(
        "Please make sure you have set email, subject and html",
        StatusCodes.SERVER_ERROR
      );
    }

    return await this.transporter.sendMail({
      from: this.fromEmail, // sender address
      to: this.toEmail, // list of receivers
      subject: this.subject, // Subject line
      //text: "Hello world?", // plain text body
      html: this.html, // html body
    });
  }
}
