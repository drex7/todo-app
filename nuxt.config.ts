import { fileURLToPath } from "url";
import type { NuxtPage }  from "nuxt/schema";

export default defineNuxtConfig({
  /*
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        pages.forEach(page => {
          console.log("page middleware", page)
          page.middleware = ["auth.global"];
        });
      }
      setMiddleware(pages)
    }
  },
  */
  compatibilityDate: "2025-06-10",
  // Disable strict
  typescript: {
    strict: false,
  },
  devtools: { enabled: true },
  experimental: {
    cookieStore: true
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "Todo App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  // ssr: true,
  nitro: {
    replace: {
      "import * as process": "import * as processUnused",
    },
    preset: "node-server", // Ensures full Node.js support (needed for Prisma)
    esbuild: {
      options: {
        target: "es2022",
      },
    },
    externals: {
      external: [
        ".prisma", // ignore Prisma internals
        "@prisma/client", // don't bundle Prisma
        "prisma", // don't bundle Prisma CLI
        "process", // Node.js process module
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-auth-utils"],
  // modules: [ "@nuxtjs/color-mode"],
  // colorMode: {
  //   preference: "system", // default theme
  //   dataValue: "theme", // activate data-theme in <html> tag
  //   classSuffix: "",
  // },
  tailwindcss: { 
    exposeConfig: true,
    cssPath: "~/assets/css/tailwind.css",
   },
  // css: ["~/assets/app.css"],
});