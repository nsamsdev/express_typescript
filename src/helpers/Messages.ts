

export default abstract class Messages {
  private header: string;
  private footer: string;
  constructor(customCss : string = "") {
    this.header = `<!DOCTYPE html>
			<html lang="en">
			<head>
  				<meta charset="utf-8">
  				<meta name="viewport" content="width=device-width, initial-scale=1">
  				<title>Message</title>
				<style>${customCss}</style>
			</head>
		<body><main>`;

    this.footer = `</main></body></html>`;
  }

  welcomeEmail(token : string) : string {
    return "";
  }

  resetEmail(token : string) : string {
    return "";
  }

  getHeader() : string {
    return this.header;
  }

  getFooter() : string {
    return this.footer;
  }

  getFullMessageHtml(bodyPart: string) : string {
    return this.header + bodyPart + this.footer;
  }
}
