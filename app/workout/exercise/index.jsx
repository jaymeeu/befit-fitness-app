import { View, Text, SafeAreaView, useWindowDimensions, StyleSheet, TouchableOpacity, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Analytics, DataStore } from 'aws-amplify'
import { Exercise, Progress, Workout } from '../../../src/models'
import { useAuthContext } from '../../../contexts/AuthContext'
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

const Exercises = () => {

    const { width, height } = useWindowDimensions()

    const params = useLocalSearchParams();

    const router = useRouter()

    const [fetchedWorkout, setFetchedWorkout] = useState([])
    const [exercises, setExercises] = useState([])

    const [activeIndex, setactiveIndex] = useState(0)
    const [completedIndex, setcompletedIndex] = useState(0)
    const [progress, setprogress] = useState([])
    const { dbUser } = useAuthContext()

    const fetchByID = async () => {
        console.log('trigger')
        try {
            const workouts = await DataStore.query(Workout, res => res.id.eq(params.id));

            const exerciseIds = workouts.flatMap(workout => workout.exercises);

            const exercises = await DataStore.query(Exercise, exerc => exerc.or(e => exerciseIds.map(id => e.id.eq(id))));

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

            const prog = await DataStore.query(Progress, p => p.and(prog => ([prog.userID.eq(dbUser.id), prog.workout_id.eq(workoutsWithExercises[0].id)])))
            setprogress(prog[0])
            if (prog[0]?.completed_exercise_ids) {
                setactiveIndex(prog[0]?.completed_exercise_ids.length)
                setcompletedIndex(prog[0]?.completed_exercise_ids.length)
            }

        } catch (error) {
            console.log(error, "eoorr");
        }

    };


    useEffect(() => {
        fetchByID();
    }, []);


    const styles = StyleSheet.create({
        topCont: {
            flex: 1,
            backgroundColor: 'transparent'
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
            alignItems: 'center',
            gap: 25
        },
        title: {
            fontSize: 22,
            color: 'white',
            fontFamily: 'work-san-bold',
            letterSpacing: 0.2
        },
        titleCont: {
            fontSize: 48,
            color: 'white',
            fontFamily: 'work-san-bold',
        },
        btnCont: {
            marginTop: "auto",
            flexDirection: 'row',
            alignItems: "center",
            gap: 20
        },
        nextBtn: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnDone: {
            flex: 1,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',

        },
        btn: {
            width: 200,
            backgroundColor: '#262445',
            borderRadius: '30px',
            padding: 15,
            marginTop: 50
        },
        btnText: {
            color: 'white',
            fontFamily: 'work-san-bold',
            textAlign: 'center',
            fontSize: 16,
        }
    })

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../../assets/sound/sound.wav')
        );
        await sound.playAsync();
      }

      const [completed, setcompleted] = useState(false)


    const nextClick = async () => {
        if (completedIndex === activeIndex ) {
            const prog = await DataStore.query(Progress, p => p.and(prog => ([prog.userID.eq(dbUser.id), prog.workout_id.eq(fetchedWorkout.id)])))

            await DataStore.save(Progress.copyOf(prog[0], item => {
                item.completed_exercise_ids = [...item.completed_exercise_ids, exercises[activeIndex].id]
            }));

            if(activeIndex + 1 ===  progress.total_exercise){
                setcompleted(true)
            }
            setactiveIndex((prev) => prev + 1)
            setcompletedIndex((prev) => prev + 1)
            playSound()
        }
        else {
            setactiveIndex((prev) => prev + 1)
            playSound()
        }
    }

    const backClick = () => {
        setactiveIndex((prev) => prev - 1)
        playSound()
    }

    if(!exercises?.[activeIndex]?.name){
            return(
              <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                opacity: 0.6,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <LottieView
                style={{ height: 150 }}
                source={require("../../../assets/animations/scanner.json")}
                autoPlay
                speed={3}
              />
            </View>
            )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: exercises?.[activeIndex]?.image }} style={styles.topCont}>
                <SafeAreaView>
                    <View style={styles.topNav}>
                        <View style={styles.progres}>
                            {
                                exercises?.map((res, index) => (
                                    <View key={index} style={[styles.progresBar, { backgroundColor: index <= activeIndex ? 'black' : 'gray' }]}></View>
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

                    <Pressable onPress={nextClick} style={styles.btnDone}>
                        <Ionicons name="checkmark-sharp" size={30} color="white" />
                    </Pressable>
                    {
                        activeIndex < (exercises.length - 1) &&
                        <Pressable onPress={nextClick} style={styles.nextBtn}>
                            <MaterialIcons name="skip-next" size={30} color="white" />
                        </Pressable>
                    }
                </View>
            </View>

            {completed &&
                <View
                    style={{
                        backgroundColor: "white",
                        position: "absolute",
                        // opacity: 0.9,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Text style={{ fontFamily: 'capriola', fontSize: 20, color: '#262445' }}>Weldone, you did great!!!</Text>
                    <LottieView
                        style={{ height: 150 }}
                        source={require("../../../assets/animations/complete.json")}
                        autoPlay
                        speed={1}
                    />

                    <Pressable
                        onPress={() => {
                            router.push({ pathname: "/plans" });

                            Analytics.record({
                                name: 'workoutEnd',
                                attributes: { 
                                    userid: dbUser?.id,
                                    userEmail: dbUser?.email, 
                                    workoutName: fetchedWorkout?.title, 
                                    workoutId: fetchedWorkout?.id
                                }
                              })
                        }
                        }
                        style={styles.btn}>
                        <Text style={styles.btnText} >Continue</Text>
                    </Pressable>
                </View>}
            

        </View>
    )
}

export default Exercises