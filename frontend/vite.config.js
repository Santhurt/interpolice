import { resolve } from "path";

export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                otra: resolve(__dirname, "otra.html"),
                /*  contact: resolve(__dirname, "contact.html"), */
            },
        },
    },
    // server: {
    //   port: 8080
    // },
    // Optional: Silence Sass deprecation warnings. See note below.
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    "import",
                    "mixed-decls",
                    "color-functions",
                    "global-builtin",
                ],
            },
        },
    },
};
