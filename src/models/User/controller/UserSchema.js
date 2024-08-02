import joi from 'joi'

export const signupSchema=joi.object({
    name:joi.string().required().min(3).max(15).lowercase().trim(),
    email:joi.string().required().email(),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    role:joi.string().valid('User','Admin'),
    confirmPassword:joi.string().valid(joi.ref('password')).required(),
})

export const updatePassword=joi.object({
    oldPassword:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    newPassword:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    confirmPassword:joi.string().valid(joi.ref('newPassword')).required()
})

