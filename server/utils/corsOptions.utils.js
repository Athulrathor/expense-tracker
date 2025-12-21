const corsOption = {
    origin: [`${process.env.CLIENT_URL}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

module.exports = corsOption;