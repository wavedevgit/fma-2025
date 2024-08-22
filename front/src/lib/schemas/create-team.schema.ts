import { z } from "zod"

export const createTeamSchema = z.object({
  name: z.string().min(1, {message: 'An email is required'}),
  slogan: z.string().min(1, {message: 'A slogan is required'}),
  mentorFullName: z.string().optional(),
})

export const createTeamDefaultValues = {
  name: "",
  slogan: "",
  mentorFullName: "",
}