import { View, Text, SafeAreaView, useWindowDimensions, StyleSheet, TouchableOpacity, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { DataStore } from 'aws-amplify'
import { Exercise, Progress, Workout } from '../../../src/models'
import { useAuthContext } from '../../../contexts/AuthContext'

const Exercises = () => {

    const { width, height } = useWindowDimensions()

  const params = useLocalSearchParams();

  const router = useRouter()

  const [fetchedWorkout, setFetchedWorkout] = useState([])
  const [exercises, setExercises] = useState([])

  const [activeIndex, setactiveIndex] = useState(0)
    const [progress, setprogress] = useState([])
    const { dbUser } = useAuthContext()

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

        setFetchedWorkout(workoutsWithExercises?.[0])
        setExercises(workoutsWithExercises?.[0]?.exercises)
        
        const prog = await DataStore.query(Progress, p => p.and( prog =>([prog.userID.eq(dbUser.id), prog.workout_id.eq(workoutsWithExercises[0].id)])))
        setprogress(prog[0])
        if(prog[0]?.completed_exercise_ids){
            setactiveIndex(prog[0].completed_exercise_ids.length)
        }

    } catch (error) {
        console.log(error, "eoorr");
    }

};

const [refetch, setrefetch] = useState(false)

useEffect(() => {
  fetchByID();
}, [refetch]);


    const styles = StyleSheet.create({
        topCont: {
            flex: 1,
            backgroundColor: 'blue'
        },
        topNav: {
            paddingHorizontal: 15,
            gap: 15
        },
        progres: {
            flexDirection: "row",
            gap: 5
        },
        progresBar: {
            flex: 1,
            height: 3,
            borderRadius: 3,
        },
        spacingly: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        bold: { fontFamily: 'work-san-bold' },
        thin: { fontFamily: 'work-san', color: 'gray' },
        bottomCont: {
            height: (height * 0.4),
            marginTop: -20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: 'black',
            paddingVertical: 60,
            paddingHorizontal: 30,
            alignItems:'center',
            gap : 25
        },
        title : {
            fontSize : 22,
            color : 'white',
            fontFamily: 'work-san-bold',
            letterSpacing : 0.2
        },
        titleCont : {
            fontSize : 48,
            color : 'white',
            fontFamily: 'work-san-bold',
        },
        btnCont : {
            marginTop : "auto",
            flexDirection :'row',
            alignItems : "center",
            gap : 20
        },
        nextBtn : {
            width : 50,
            height : 50,
            borderRadius : 25,
            backgroundColor : 'blue',
            alignItems : 'center',
            justifyContent : 'center',
        },
        btnDone : {
            flex : 1,
            height : 50,
            borderRadius : 25,
            backgroundColor : 'blue',
            alignItems : 'center',
            justifyContent : 'center',

        }
    })

    const nextClick = async () =>{

        if(!(progress.completed_exercise_ids.includes(exercises[activeIndex].id))){

            await DataStore.save(Progress.copyOf(progress, item => {
                item.completed_exercise_ids = [...item.completed_exercise_ids, exercises[activeIndex].id]
            }));

            setrefetch(!refetch)

            // setprogress(prevData => ({
            //     ...prevData,
            //     completed_exercise_ids: [...prevData.completed_exercise_ids, exercises[activeIndex].id]
            //   }));

        }

        setactiveIndex((prev)=> prev + 1)
    }

    const backClick = () =>{
        setactiveIndex((prev)=> prev - 1)
    }

    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <ImageBackground source={{uri : exercises?.[activeIndex]?.image}} style={styles.topCont}>
                <SafeAreaView>
                <View style={styles.topNav}>
                    <View style={styles.progres}>
                        {
                            exercises?.map((res, index)=>(
                                <View key={index} style={[styles.progresBar, {backgroundColor: index <= activeIndex ? 'black' : 'gray'}]}></View>
                            ))
                        }
                    </View>
                    <View style={styles.spacingly}>
                        <TouchableOpacity>
                            <Ionicons onPress={() => router.back()} name="ios-close-circle-sharp" size={28} color="grey" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.bold}>Exercises {activeIndex + 1}/{exercises?.length}</Text>
                            {/* <Text>00:31</Text> */}
                        </View>
                    </View>
                </View>
                </SafeAreaView>
            </ImageBackground>

            <View style={styles.bottomCont}>
                <Text style={styles.title}>{exercises[activeIndex]?.name.toUpperCase()}</Text>

                <Text style={styles.titleCont} >x {exercises[activeIndex]?.reps}</Text>

                <View style={styles.btnCont}>
                    {
                        activeIndex > 0 &&
                        <Pressable onPress={backClick} style={styles.nextBtn}>
                            <MaterialIcons name="skip-previous" size={30} color="white" />
                        </Pressable>
                    }

                    <View style={styles.btnDone}>
                        <Ionicons name="checkmark-sharp" size={30} color="white" />
                    </View>
                    {
                        activeIndex < (exercises.length - 1) &&
                        <Pressable onPress={nextClick}  style={styles.nextBtn}>
                            <MaterialIcons name="skip-next" size={30} color="white" />
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}

export default Exercises