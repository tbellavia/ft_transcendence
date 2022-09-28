import { HttpException, NotAcceptableException } from "@nestjs/common";

export class MatchConstrainException extends NotAcceptableException {
	constructor(username: string) {
		super(`${username} cannot play with himself`);
	}
}