import { Step } from "./step.type";

export const steps: Step[] = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email']
  },
  {
    id: 'Step 2',
    name: 'Studies',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 3',
    name: 'Competition',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 4',
    name: 'Uploads',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { id: 'Step 5', name: 'Validation' }
];