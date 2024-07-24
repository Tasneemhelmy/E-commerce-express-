import joi from "joi";


export const addProductSchema=joi.object({
    title:joi.string().required().trim().max(25).min(2),
    description:joi.string().required().trim(),
    price:joi.number().required().min(0),
    priceAfterDiscount:joi.number(),
    stock:joi.number().required().min(0),
    sold:joi.number().min(0),
    rateCount:joi.number().min(0),
    rateAvg:joi.number().min(0),
    category:joi.string().required().length(24).hex(),
    subcategory:joi.string().required().length(24).hex(),
    brand:joi.string().required().length(24).hex(),

    files:joi.object({
        mainImage:joi.array().items(joi.object({
            fieldname:joi.string().required(),
            originalname:joi.string().required(),
            mimetype:joi.string().required(),
            destination:joi.string().required(),
            filename:joi.string().required(),
            encoding:joi.string().required(),
            path:joi.string().required(),
            size:joi.number().positive().required()
        })),
        coverImage:joi.array().items(joi.object({
            fieldname:joi.string().required(),
            originalname:joi.string().required(),
            mimetype:joi.string().required(),
            destination:joi.string().required(),
            filename:joi.string().required(),
            encoding:joi.string().required(),
            path:joi.string().required(),
            size:joi.number().positive().required()
        }))

        })
    }).required()
