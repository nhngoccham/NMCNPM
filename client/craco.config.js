const path = require("path");
module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
        exclude: ["node_modules", "**/node_modules/*", "build"],
    },
    eslint: {
        enable: null,
    },
};
