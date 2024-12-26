

import Messages from "../../helpers/Messages.js";

export default class SoogMessages extends Messages {
  constructor(customCss : string = "") {
    super(customCss);
  }

  resetEmail(resetLinkWithToken : string) {
    return this.getFullMessageHtml(`
			<p>
			Dear Soog player, you have requested a password reset. Please click on the reset button below to change your password.
			</p>
			<p>
				<a href="${resetLinkWithToken}">Reset Password</a>
			</p>

			<p><b>If the link above does not work please copy and paste the link below into your browser URL</b></p>

			<p>
			${resetLinkWithToken}
			</p>

			<p>
			Thank You,
			Soog Teeam
			</p>
		`);
  }

  welcomeEmail(activationLinkWtihToken: string) {
    return this.getFullMessageHtml(`
			<p>
				Welcome to Soog. Thanks for signing up. You are on your way to gain more knowledge and being able to compete with other
				players. To Continue please click on the link below to activate your account.
			</p>
			<p>
				<a href="${activationLinkWtihToken}">Activate Account</a>
			</p>

			<p><b>If the link above does not work please copy and paste the link below into your browser URL</b></p>

			<p>
			${activationLinkWtihToken}
			</p>

			<p>
			Thank You,
			Soog Teeam
			</p>
		`);
  }
}
