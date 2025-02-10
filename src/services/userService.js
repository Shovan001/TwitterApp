import {createUser as createUserRepository,
        findUserByEmail as findUserByEmailRepository
    } from '../repositories/userRepository.js';

import bcrypt from 'bcrypt';

export const registerUser = async ({userName, email, password}) => {
    const existingUser = await findUserByEmailRepository(email);
    if(existingUser){
        throw {
            message: "User already exists",
            status: 400
        };
    }

    const user = await createUserRepository({
        userName,
        email,
        password
    });
    return user;
};

export const loginUser = async ({email, password}) => {
    const user = await findUserByEmailRepository(email);
    if(!user){
        throw {
            message: "Invalid email or password",
            status: 401
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw {
            message: "Invalid email or password",
            status: 401
        };
    }

    return {
        user: {
            id: user.id,
            userName: user.userName,
            email: user.email
        }
    };
}
