import { Step } from "./step.type";

const createTeamFields = ['name', 'slogan', 'mentorFullName'];

const joinTeamFields = ['teamId', 'accessCode'];

export const steps: Step[] = [
  {
    id: 'Step 1',
    name: 'Team options',
    getFields: (_) => [],
  },
  {
    id: 'Step 2',
    name: 'Create / Join a Team',
    getFields: (formType?: string) => {
      switch(formType) {
        case 'create':
          return createTeamFields
        case 'join':
          return joinTeamFields
        default:
          return []
      }
    }
  },
  {
    id: 'Step 3',
    name: 'Summary',
    getFields: (_) => [],
  },
];
