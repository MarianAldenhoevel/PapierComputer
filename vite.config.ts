import react from '@vitejs/plugin-react'
import { defineConfig } from "vitest/config";
// import { defineConfig } from 'vite' // replaced by vitest

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PapierComputer/",
  test: {
    environment: "node",
  },
});
