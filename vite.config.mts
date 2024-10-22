import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPaths()],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext", // Ensures modern JS is targeted
			format: "esm", // Use ESM format
		},
	},
	test: {
		environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
	},
})
