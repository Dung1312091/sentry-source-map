const {
    init
} = require('@sentry/electron');

init({
    dsn: 'https://70cd0cb5f0c04de18bbd9a15203ff3c8@sentry.io/4160835',
    debug: true,
    release: 'v4'
});