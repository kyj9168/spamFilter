module.exports = {
    spamCheck: async (req, res) => {
        if (req.method === 'POST') req.query = req.body;

        const payload = req.query;

        res.send(payload);
    },
};
