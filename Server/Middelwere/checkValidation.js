const validateUser = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        const errMsg = error.errors[0].message;
        res.status(400).json({msg:errMsg});
    }

}

export default validateUser;