import AppError from "./app-error"

export class AddressNotFoundError extends AppError {
	constructor() {
		super("Address not found", 404)
	}
}
