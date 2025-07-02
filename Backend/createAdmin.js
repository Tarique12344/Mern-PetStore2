require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const email = "employee@simplepets.com";
    const password = "password123"; // use a secure password

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists, updating to admin...");
            existingUser.isAdmin = true;
            await existingUser.save();
        } else {
            const user = new User({
                email,
                password,
                isAdmin: true,
            });
            await user.save();
            console.log("Admin user created successfully");
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
