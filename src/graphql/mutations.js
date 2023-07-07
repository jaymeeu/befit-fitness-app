/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      age
      height
      weight
      workouts {
        items {
          id
          title
          description
          date
          duration
          caloriesBurned
          createdAt
          updatedAt
          userWorkoutsId
          __typename
        }
        nextToken
        __typename
      }
      achievements {
        id
        name
        description
        earnedDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      age
      height
      weight
      workouts {
        items {
          id
          title
          description
          date
          duration
          caloriesBurned
          createdAt
          updatedAt
          userWorkoutsId
          __typename
        }
        nextToken
        __typename
      }
      achievements {
        id
        name
        description
        earnedDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      age
      height
      weight
      workouts {
        items {
          id
          title
          description
          date
          duration
          caloriesBurned
          createdAt
          updatedAt
          userWorkoutsId
          __typename
        }
        nextToken
        __typename
      }
      achievements {
        id
        name
        description
        earnedDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      title
      description
      date
      duration
      caloriesBurned
      exercises {
        items {
          id
          name
          sets
          reps
          weight
          duration
          createdAt
          updatedAt
          workoutExercisesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userWorkoutsId
      __typename
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      title
      description
      date
      duration
      caloriesBurned
      exercises {
        items {
          id
          name
          sets
          reps
          weight
          duration
          createdAt
          updatedAt
          workoutExercisesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userWorkoutsId
      __typename
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      title
      description
      date
      duration
      caloriesBurned
      exercises {
        items {
          id
          name
          sets
          reps
          weight
          duration
          createdAt
          updatedAt
          workoutExercisesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userWorkoutsId
      __typename
    }
  }
`;
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
      id
      name
      sets
      reps
      weight
      duration
      createdAt
      updatedAt
      workoutExercisesId
      __typename
    }
  }
`;
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
      id
      name
      sets
      reps
      weight
      duration
      createdAt
      updatedAt
      workoutExercisesId
      __typename
    }
  }
`;
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
      id
      name
      sets
      reps
      weight
      duration
      createdAt
      updatedAt
      workoutExercisesId
      __typename
    }
  }
`;
export const createAchievement = /* GraphQL */ `
  mutation CreateAchievement(
    $input: CreateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    createAchievement(input: $input, condition: $condition) {
      id
      name
      description
      earnedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAchievement = /* GraphQL */ `
  mutation UpdateAchievement(
    $input: UpdateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    updateAchievement(input: $input, condition: $condition) {
      id
      name
      description
      earnedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAchievement = /* GraphQL */ `
  mutation DeleteAchievement(
    $input: DeleteAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    deleteAchievement(input: $input, condition: $condition) {
      id
      name
      description
      earnedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
