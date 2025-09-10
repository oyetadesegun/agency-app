import z from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(3).max(255),
    shortDesc: z.string(),
    description: z.string().min(5, "Description is too short"),
    amount: z.coerce.number().positive().min(500, "Amount is too little"),
});
