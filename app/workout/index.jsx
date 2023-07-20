import { View, Text, ImageBackground, StyleSheet, ScrollView, Pressable, Image } from 'react-native'
import pushup from '../../assets/images/pushup.jpeg'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TextStroke } from '../../components/TextStroke'
import { DataStore } from 'aws-amplify'
import { Workout } from '../../src/models'
import { Exercise } from '../../src/models'
import { SafeAreaView } from 'react-native-safe-area-context'

const Workout_id = () => {

  const params = useLocalSearchParams();

  const styles = StyleSheet.create({
    imageHeader: {
      height: 200,
      justifyContent: 'center',
      padding: 20
    },
    container: {
      marginTop: -20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: 'black',
      padding: 15,
    },
    flexer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#707070',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 15,
      flex: 1
    },
    card_flex: {
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: '100%'
    },
    title: {
      fontFamily: 'capriola',
      color: 'white',
      fontSize: 18
    },
    subtitle: {
      fontFamily: 'work-san',
      color: 'gray',
      fontSize: 14,
      marginTop: 8
    },
    name: {
      fontFamily: 'capriola',
      color: 'white',
      fontSize: 26
    },
    add_border: {
      borderLeftColor: '#707070',
      borderLeftWidth: StyleSheet.hairlineWidth,
      paddingLeft: 20
    },
    workout1: {
      fontFamily: 'capriola',
      color: 'white',
      fontSize: 18,
      marginBottom: 5
    },
    workout: {
      fontFamily: 'work-san',
      color: 'white',
      fontSize: 16
    },
    flexerV2: {
      // justifyContent : 'space-around',
      borderBottomColor: '#707070',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 15,
      height: "100%",
      flex: 1
    },
    btncont: {
      bottom: 0,
      position: "absolute",
      borderColor: '#e8e8e8',
      borderTopWidth: 1,
      flexDirection: 'row',
      background: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingBottom: 40,
      width: '100%',
      backgroundColor: 'black'
    },
    btn: {
      width: '90%',
      backgroundColor: 'blue',
      borderRadius: '30px',
      padding: 15
    },
    btnText: {
      color: 'white',
      fontFamily: 'work-san-bold',
      textAlign: 'center',
      fontSize: 16,
    }

  })

  const [fetchedWorkout, setFetchedWorkout] = useState([])

  const fetchByID = async () => {
    try {
        const workouts = await DataStore.query(Workout, res => res.id.eq(params.id));

        const exerciseIds = workouts.flatMap(workout => workout.exercises);

        const exercises = await DataStore.query(Exercise, exerc => exerc.or(e => exerciseIds.map(id => e.id.eq(id)) )); 
  
        const exerciseMap = exercises.reduce((map, exercise) => {
          map[exercise.id] = exercise;
          return map;
        }, {});
  
        const workoutsWithExercises = workouts.map(workout => ({
          ...workout,
          exercises: workout.exercises.map(exerciseId => exerciseMap[exerciseId]),
        }));

        setFetchedWorkout(workoutsWithExercises[0])
    } catch (error) {
        console.log(error, "eoorr");
    }
};

useEffect(() => {
  fetchByID();
}, []);

  const router = useRouter()

  return (
    fetchedWorkout?.title &&
    <View style={{ flex: 1 }}>
      <ImageBackground source={{uri : fetchedWorkout.image}} style={styles.imageHeader}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle-outline" size={36} color="white" />
          </Pressable>
          <TextStroke stroke={1} color={"#000000"}>
            <Text style={styles.name}>{fetchedWorkout.title.toUpperCase()}</Text>
          </TextStroke>

        </View>
      </ImageBackground>


      <ScrollView style={styles.container}>
        {/* <Text>{workout_id}</Text> */}
        <View>
          <View style={styles.flexer}>
            <View>
              <Text style={styles.title}>{fetchedWorkout.level}</Text>
              <Text style={styles.subtitle}>Level</Text>
            </View>
            <View style={styles.add_border}>
              <Text style={styles.title}>18 mins</Text>
              <Text style={styles.subtitle}>Time</Text>
            </View>
            <View style={styles.add_border}>
              <Text style={styles.title}>{fetchedWorkout.focus[0]}</Text>
              <Text style={styles.subtitle}>Focus Area</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.title, { paddingVertical: 15 }]}>Exercises <Text style={{ color: "#707070" }}>({fetchedWorkout.exercises.length})</Text> </Text>

          {
            fetchedWorkout.exercises.map((exe)=>(
              <View key={exe.id} style={styles.card_flex}>
                <Image source={{uri : exe.image}} style={{ width: 100, height: 100, borderRadius: 15 }} />
                <View style={styles.flexerV2}>
                  <Text style={styles.workout1}>{exe.name.toUpperCase()}</Text>
                 
                  <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>x {exe.reps}</Text>
                </View>
              </View>
            ))
          }
            <View style={{ height: 130 }}></View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.btncont}>
        <Pressable onPress={() => router.push({ pathname : '/workout/exercise', params :  params})} style={styles.btn}>
          <Text style={styles.btnText} >START</Text>
        </Pressable>
      </View>

    </View>

  )
}

export default Workout_id