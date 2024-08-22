import { z } from "zod"

export const joinTeamSchema = z.object({
  teamId: z.string().min(1).max(50),
  accessCode: z.string().min(1).max(50),
})

export const joinTeamDefaultValues = {
  teamId: '',
  accessCode: '',
}