// this is the pm2 configuration file
module.exports = {
    apps: [{
        name: "pilotBe",
        script: "./app.js",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}