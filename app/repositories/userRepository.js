// repositories/userRepository.js
const User = require('../model/userModel');

class UserRepository {
    async createUser(userData) { 
        const user = new User(userData);
        return user.save();
    }

    async deleteUser(userId) {
        return User.findByIdAndDelete(userId);
    }

    async findUserById(userId) {
        return User.findById(userId);
    }
 
    async findAllUsers() {
        return User.find();
    }
}

module.exports = new UserRepository();
