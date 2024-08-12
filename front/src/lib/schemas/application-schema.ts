import { isValidPhoneNumber } from "react-phone-number-input";
import { ZodSchema, z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpeg','image/jpg', 'image/png','image/webp', 'application/pdf'];
const zodFileValidation = z.any()
  .refine(files => files?.length == 1, 'File is required.')
  .refine(files => ACCEPTED_FILE_TYPES.includes(files[0]?.type), { message: 'Please choose PNG, JPEG or PDF format files only' })
  .refine(files => files[0]?.size <= MAX_UPLOAD_SIZE, 'File size must be less than 3MB')

export const applicationSchema: ZodSchema = z.object({
  /* Personal Informations */
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.date({ required_error: "A date of birth is required." }),
  identityCardNumber: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  region: z.string().nonempty("Please select an option"),
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  emergencyContactName: z.string().min(1).max(50),
  emergencyContactPhoneNumber:z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),

  /* Education */
  lastYearEducationLevel: z.string().nonempty("Please select an option"),
  educationProgram: z.string().nonempty("Please select an option"),
  establishment: z.string().min(1).max(50),
  fieldOfStudy: z.string().min(1).max(50),
  
  cpgeGradeTrimesterOne: z.string().optional(),
  cpgeGradeTrimesterTwo: z.string().optional(),
  cpgeRankingTrimesterOne: z.string().optional(),
  cpgeRankingTrimesterTwo: z.string().optional(),

  nonCpgeAverageThreeBestScienceGrades: z.string().optional(),
  nonCpgeAverageScienceGrades: z.string().optional(),
  nonCpgeOverallAverage: z.string().optional(),

  /* Competition */
  hasPreviouslyParticipated: z.enum(["yes", "no"], { required_error: "Please select an option." }),
  previousCompetitions: z.string().optional(),
  hasPreviouslyParticipatedInMmc: z.enum(["yes", "no"], { required_error: "Please select an option." }),
  previousResultsInMmc: z.string().optional(),
  motivations: z.string().min(1).refine(async text => text.split(' ').length <= 300, { message: "Text can't be more than 300 words", }),
  comments: z.string().optional().refine((val) => {
    if (val) {
      return val.split(' ').length <= 100
    }
    return true;
  } , { message: "Text can't be more than 100 words"}),

  /* Uploads */
  identityCard: zodFileValidation,
  certificateOfSchooling: zodFileValidation,
  regulations: zodFileValidation,
  grades: zodFileValidation,

  /* Terms of agreement */
  termsAgreement: z.boolean().default(false).refine(value => value === true, { message: "You must accept the Terms of Agreement"}),
}).refine(data => {
  if (data.educationProgram === 'cpge') {
    if (!data.cpgeGradeTrimesterOne 
      || !data.cpgeGradeTrimesterTwo 
      || !data.cpgeRankingTrimesterOne 
      || !data.cpgeRankingTrimesterTwo
    ) return false
  } else {
    if (!data.nonCpgeAverageThreeBestScienceGrades 
      || !data.nonCpgeAverageScienceGrades 
      || !data.nonCpgeOverallAverage
    ) return false
  }

  return true;
}, {
  message: "Grades are required",
  path: ['cpgeGradeTrimesterOne'],
})

export const getApplicationDefaultValues = (userData: any) => ({
  firstName: userData?.firstName || "",
  lastName: userData?.lastName || "",
  dateOfBirth: "",
  identityCardNumber: "",
  city: "",
  region: "",
  phoneNumber: "",
  emergencyContactName: "",
  emergencyContactPhoneNumber: "",

  lastYearEducationLevel: "",
  educationProgram: "",
  establishment: "",
  fieldOfStudy: "",
  cpgeGradeTrimesterOne: "",
  cpgeGradeTrimesterTwo: "",
  cpgeRankingTrimesterOne: "",
  cpgeRankingTrimesterTwo: "",
  nonCpgeAverageThreeBestScienceGrades: "",
  nonCpgeAverageScienceGrades: "",
  nonCpgeOverallAverage: "",

  hasPreviouslyParticipated: undefined,
  previousCompetitions: "",
  hasPreviouslyParticipatedInMmc: undefined,
  previousResultsInMmc: "",
  motivations: "",
  comments: "",

  identityCard: undefined,
  certificateOfSchooling: undefined,
  regulations: undefined,
  grades: undefined,

  termsAgreement: false,
})