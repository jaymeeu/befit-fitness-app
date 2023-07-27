import { FlatList, ImageBackground, Platform, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Camelize } from '../../utils/Camelize';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const MyWorkouts = ({ workouts, progress }) => {
    const router = useRouter()

    function calculateSumOfRatios(id) {
        if (progress.length === 0) { return "" }
        const res = progress.filter((datum) => datum.workout_id === id)
        if (res.length > 0) {
            const completedIds = res[0]?.completed_exercise_ids.length;
            const totalExercise = res[0].total_exercise;
            if (completedIds === totalExercise) {
                return 'done'
            }
            else {
                return `${completedIds}/${totalExercise}`;
            }
        }
        else {
            return ""
        }
    }

    return (

        <FlatList
            numColumns={2}
            columnWrapperStyle={{ gap: 15 }}
            data={workouts}
            renderItem={({ item }) => (
                <TouchableHighlight
                    key={item.id}
                    onPress={() => {
                        calculateSumOfRatios(item.id) === 'done' ?
                            console.log('done')
                            :
                            router.push({
                                pathname: "/workout",
                                params: { id: item.id },
                            })
                    }
                    }
                    style={{ flex: 1, marginBottom: 20 }}
                >
                    <View style={{ backgroundColor: 'white' }}>
                        <ImageBackground
                            imageStyle={{ borderRadius: 10, opacity: calculateSumOfRatios(item.id) === 'done' ? 0.5 : 1 }}
                            source={{ uri: item?.image }} style={styles.item}>

                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'white', opacity: 0.7 }}>

                                    <Text style={[styles.title, { fontSize: 14 }]}>{calculateSumOfRatios(item.id) === 'done' ? <MaterialIcons name="done" size={24} color="black" /> : calculateSumOfRatios(item.id)}</Text>
                                </View>
                            </View>
                            <View
                                style={styles.btn}>
                                <Text style={styles.btnText}> {calculateSumOfRatios(item.id) === 'done' ? "Completed" : "Continue"}</Text>
                            </View>

                        </ImageBackground>
                        <Text style={styles.title} numberOfLines={1}>{Camelize(item?.title)}</Text>
                        <Text style={styles.level}>{Camelize(item?.level)}</Text>

                    </View>
                </TouchableHighlight>
            )}
        />

    )
}

export default MyWorkouts

const styles = StyleSheet.create({
    item: {
        padding: 10,
        flex: 1,
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'capriola'
    },
    level: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'work-san'
    },
    btn: {
        width: '90%',
        backgroundColor: 'white',
        opacity: 0.7,
        borderRadius: 20,
        padding: 8
    },
    btnText: {
        color: 'blue',
        fontFamily: 'work-san-bold',
        textAlign: 'center',
        fontSize: 12,
    }
})