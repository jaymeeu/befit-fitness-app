// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Level = {
  "BASIC": "BASIC",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const { User, Workout, Exercise, Achievement } = initSchema(schema);

export {
  User,
  Workout,
  Exercise,
  Achievement,
  Level
};