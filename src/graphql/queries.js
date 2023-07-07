/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        age
        height
        weight
        workouts {
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
      nextToken
      __typename
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        date
        duration
        caloriesBurned
        exercises {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userWorkoutsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getAchievement = /* GraphQL */ `
  query GetAchievement($id: ID!) {
    getAchievement(id: $id) {
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
export const listAchievements = /* GraphQL */ `
  query ListAchievements(
    $filter: ModelAchievementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        earnedDate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
