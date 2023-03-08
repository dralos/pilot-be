module.exports = (sequelize, Sequelize) => {
    const Desserts = sequelize.define("desserts", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calories : {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    })

    return Desserts
}