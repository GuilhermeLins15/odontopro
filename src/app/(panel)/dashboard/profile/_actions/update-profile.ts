"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: "Preencha todos os campos"
    }
  }

  console.log("PASSOU: ", formData);
}
