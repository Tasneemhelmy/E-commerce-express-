import joi from "joi";

export const addCategorySchema=joi.object({
name:joi.string().required().trim().min(2).max(26),
file:joi.object({
    fieldname:joi.string().required(),
    originalname:joi.string().required(),
    mimetype:joi.string().required(),
    destination:joi.string().required(),
    filename:joi.string().required(),
    encoding:joi.string().required(),
    path:joi.string().required(),
    size:joi.number().positive().required()
})

}).required()