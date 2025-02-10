import { StatusCodes } from "http-status-codes";
import {registerUser as registerUserService,
        loginUser as loginUserService
        } from "../services/userService.js";    

import { errorResponse, successResponse } from "../utils/responses.js";

export const signupUser = async (req, res) => {
    try {
        const response = await registerUserService({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });
        return successResponse(response, StatusCodes.CREATED, "User registered successfully", res);
    } catch (error) {
        return errorResponse(error, res);
    }
    
}

export const loginUser = async (req, res) => {
    try {
        const {user} = await loginUserService({
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        });

        return successResponse({
            user: {
                id:user.id,
                email: user.email,
                userName: user.userName,
                
            }
        },
        StatusCodes.OK,
        "User logged in successfully",
        res);
        
    } catch (error) {
        return errorResponse(error, res);
    }
    
}