const { connectionSequelize, sequelize } = require('./config/database.js');
const app = require('./app.js');

const PORT = process.env.PORT || 3000;

// Sync Database
(async () => { 
    try {
        await sequelize.sync({alter: false});
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Database synchronization failed!: ",error);
    }
})();

// Starting the server
app.listen(PORT, async () => {
    await connectionSequelize();
    console.log(`Server is running on http://localhost:${PORT}`);
});

