import { View, Text, ImageBackground, StyleSheet, ScrollView, Pressable, Image } from 'react-native'
import pushup from '../../../assets/images/pushup.jpeg'
import React from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Workout_id = () => {

  const { workout_id } = useSearchParams()

  const styles = StyleSheet.create({
    imageHeader: {
      height: 200,
      justifyContent:'center',
      padding : 20
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
      paddingBottom : 40,
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

  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={pushup} style={styles.imageHeader}>
        <Pressable onPress={()=>router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={36} color="white" />
        </Pressable>
      </ImageBackground>


      <ScrollView style={styles.container}>
        {/* <Text>{workout_id}</Text> */}
        <View>
          <Text style={styles.name}>ABS</Text>
          <View style={styles.flexer}>
            <View>
              <Text style={styles.title}>Beginner</Text>
              <Text style={styles.subtitle}>Level</Text>
            </View>
            <View style={styles.add_border}>
              <Text style={styles.title}>18 mins</Text>
              <Text style={styles.subtitle}>Time</Text>
            </View>
            <View style={styles.add_border}>
              <Text style={styles.title}>Abs</Text>
              <Text style={styles.subtitle}>Focus Area</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.title, { paddingVertical: 15 }]}>Exercises <Text style={{ color: "#707070" }}>(16)</Text> </Text>

            <Pressable onPress={() => console.log('hello')} style={styles.card_flex}>
              <Image source={pushup} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.flexerV2}>
                <Text style={styles.workout1}>Abs - Beginner</Text>
                <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>5 Workouts</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => console.log('hello')} style={styles.card_flex}>
              <Image source={pushup} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.flexerV2}>
                <Text style={styles.workout1}>Abs - Beginner</Text>
                <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>5 Workouts</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => console.log('hello')} style={styles.card_flex}>
              <Image source={pushup} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.flexerV2}>
                <Text style={styles.workout1}>Abs - Beginner</Text>
                <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>5 Workouts</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => console.log('hello')} style={styles.card_flex}>
              <Image source={pushup} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.flexerV2}>
                <Text style={styles.workout1}>Abs - Beginner</Text>
                <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>5 Workouts</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => console.log('hello')} style={styles.card_flex}>
              <Image source={pushup} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.flexerV2}>
                <Text style={styles.workout1}>Abs - Beginner</Text>
                <Text style={[styles.workout, { color: '#707070', marginTop: 10 }]}>5 Workouts</Text>
              </View>
            </Pressable>
            <View style={{ height: 130 }}></View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.btncont}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText} >START</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Workout_id