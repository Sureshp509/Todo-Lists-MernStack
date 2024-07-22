const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ email, password });
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.json({
                message:"Registered Successfully",
               })
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = { user: { id: user.id, email: user.email } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({message:"Login Successful",email, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({error:err.message,message:'Internal Server error'});
    }
};




