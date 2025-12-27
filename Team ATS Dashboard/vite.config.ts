import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	preview: {
		host: true,
		port: 4173,
		allowedHosts: ["dashboard.preparationacademybd.com", "localhost", "127.0.0.1"]
	}
});
