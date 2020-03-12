const {
    init
} =
process.type === "browser" ?
    require("@sentry/electron/dist/main") :
    require("@sentry/electron/dist/renderer");
init({
    dsn: "https://70cd0cb5f0c04de18bbd9a15203ff3c8@sentry.io/4160835",
    debug: true,
    release: "v10.2"
});