import AppError from "./app-error"

export class SectionNotFoundError extends AppError {
	constructor() {
		super("Section not found", 404)
	}
}
