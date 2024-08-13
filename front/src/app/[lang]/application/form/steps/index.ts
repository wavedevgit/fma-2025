import { Step } from "./step.type";

export const steps: Step[] = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'dateOfBirth', 'identityCardNumber', 'city', 'region', 'phoneNumber', 'guardianFullName', 'guardianPhoneNumber', 'relationshipWithGuardian', 'specialConditions']
  },
  {
    id: 'Step 2',
    name: 'Education',
    fields: ['educationLevel', 'educationField', 'highschool']
  },
  {
    id: 'Step 3',
    name: 'Competition',
    fields: ['hasPreviouslyParticipated', 'previousCompetitions', 'hasPreviouslyParticipatedInMtym', 'motivations', 'comments']
  },
  {
    id: 'Step 4',
    name: 'Uploads',
    fields: ['cnie', 'schoolCertificate', 'grades', 'regulations', 'parentalAuthorization']
  },
  { id: 'Step 5', 
    name: 'Validation',
    fields: ['termsAgreement']
  }
];

export { PersonalInformationStep } from './personal-information-step'
export { EducationStep } from './education-step'
export { CompetitionStep } from "./competition-step"
export { UploadStep } from './upload-step'
export { ValidationStep } from './validation-step'

