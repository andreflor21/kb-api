import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
	JWT_SECRET: z.string(),
	PORT: z.coerce.number().default(3333),
	SWAGGER_HOST: z.string().url().default("localhost:3000"),
	SWAGGER_SCHEME: z.enum(["http", "https"]).default("http"),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error("❌ Invalid environment variables", _env.error.format())

	throw new Error("Invalid environment variables.")
}
const env = _env.data
export default env
