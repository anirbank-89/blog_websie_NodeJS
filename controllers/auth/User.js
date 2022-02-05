import passwordHash from 'password-hash';

import userSchema from '../../models/user.js';

export var register = async (req, res) => {
    try {
        req.body.password = passwordHash.generate(req.body.password);

        const NEW_USER = new userSchema(req.body);

        let docs = await NEW_USER.save();

        return res.status(200).json({
            status: true,
            message: "Data saved successfully",
            data: docs
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to save data. Server error.",
            error: err.message
        });
    }
}