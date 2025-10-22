import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // 1. Set the host to '0.0.0.0' or true to listen on all public network interfaces.
        // This allows access from your actual domain when pointed to your local machine (e.g., via /etc/hosts).
        host: true,

        // 2. Specify the allowed domains that can access the dev server via the Host header.
        // This is the direct equivalent of "allow domain called sowhen.app" for the dev server.
        // Use an array to include both 'localhost' and your custom domain.
        allowedHosts: [
            "sowhen.app",
            "www.sowhen.app",
            "chippy",
            "localhost", // Keep localhost for local access
        ],

        // Optional: If you use HTTPS for your domain locally, you might need this.
        // hmr: {
        //   host: 'sowhen.app',
        // }
    },
});
