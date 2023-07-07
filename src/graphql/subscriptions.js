/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
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
export const onCreateAchievement = /* GraphQL */ `
  subscription OnCreateAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onCreateAchievement(filter: $filter) {
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
export const onUpdateAchievement = /* GraphQL */ `
  subscription OnUpdateAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onUpdateAchievement(filter: $filter) {
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
export const onDeleteAchievement = /* GraphQL */ `
  subscription OnDeleteAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onDeleteAchievement(filter: $filter) {
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
