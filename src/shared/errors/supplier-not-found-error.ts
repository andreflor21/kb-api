import AppError from "./app-error"

export class SupplierNotFoundError extends AppError {
	constructor() {
		super("Supplier not found", 404)
	}
}
