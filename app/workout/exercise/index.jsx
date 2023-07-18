import { View, Text, SafeAreaView, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Exercises = () => {

    const { width, height } = useWindowDimensions()

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
            backgroundColor: 'gray'
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
            backgroundColor : 'gray',
            alignItems : 'center',
            justifyContent : 'center',
        },
        btnDone : {
            flex : 1,
            height : 50,
            borderRadius : 25,
            backgroundColor : 'gray',
            alignItems : 'center',
            justifyContent : 'center',

        }
    })

    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <SafeAreaView style={styles.topCont}>
                <View style={styles.topNav}>
                    <View style={styles.progres}>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                        <View style={styles.progresBar}></View>
                    </View>
                    <View style={styles.spacingly}>
                        <TouchableOpacity>
                            <Ionicons name="ios-close-circle-sharp" size={28} color="grey" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.bold}>Exercises 1/16</Text>
                            <Text>00:31</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.bottomCont}>
                <Text style={styles.title}>ABDOMINAL CRUNCHES</Text>

                <Text style={styles.titleCont} >x 16</Text>

                <View style={styles.btnCont}>
                    <View style={styles.nextBtn}>
                        <MaterialIcons name="skip-previous" size={30} color="white" />
                    </View>

                    <View style={styles.btnDone}>
                        <Ionicons name="checkmark-sharp" size={30} color="white" />
                    </View>

                    <View style={styles.nextBtn}>
                        <MaterialIcons name="skip-next" size={30} color="white" />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default Exercises