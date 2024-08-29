import {z} from 'zod';

export const validateSchema = z.object({
    username:z.string({required_error:'username are required'})
    .trim()
    .min(3, 'username should be atleast 3 characters long')
    .max(60, 'username should not exceed 60 characters'),

    email:z.string({required_error:'email is required'})
    .email({required_error:'email is not valid '})
    .trim(),

    password:z.string({required_error:'password is required'})
    .trim()
    .min(3, 'password should be atleast 3 characters long')
    .max(20, 'password should not exceed 20 characters'),
    

})