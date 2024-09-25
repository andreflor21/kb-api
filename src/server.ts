import { env } from "node:process"
import { app } from "./app"

app.listen({
	host: "0.0.0.0",
	port: env.PORT ? env.PORT : 3333,
}).then(() => {
	console.log("🚀 HTTP Server Running!")
})
