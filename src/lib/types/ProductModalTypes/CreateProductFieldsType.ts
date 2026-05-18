import { CreateProductSchema } from "@/lib/Zod_Schemas/CreateProduct.schema";
import z from "zod";
// ===================================================================================
export type CreateProductFieldsType = z.infer<typeof CreateProductSchema>;