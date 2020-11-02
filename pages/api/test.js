const handler = async (req, res) => {
    return res.json(process.env.DATABASE_URL);
};

export default handler;
