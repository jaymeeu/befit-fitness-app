import { View, Text, Pressable, StyleSheet, useColorScheme, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { useUserContext } from '../../contexts/RegContext';

const Height = ({ goNext }) => {

    const { info, updateState, isFeet, setisFeet } = useUserContext()

const [height, setheight] = useState(info.height)

    const styles = StyleSheet.create({
        contaiver: {
            paddingHorizontal: 15,
            paddingVertical: 40,
            height: '100%',
            justifyContent: 'space-between'
        },
        textCont: {
            flexDirection: 'column',
            gap: 10,

        },
        heading: {
            fontSize: 22,
            fontFamily: "capriola",
            fontWeight: 'bold', 
            textAlign: 'center'
        },
        descr: {
            fontSize: 13,
            fontFamily: "work-san",
            textAlign: 'center'
        },

        btncontainer: {
            marginTop: 20,
            padding: 20
        },
        btn: {
            backgroundColor: '#d4d4d4',
            padding: 15,
            borderRadius: 25,

        },

        btnText: {
            fontSize: 16,
            color: "white",
            textAlign: 'center'
        },
        genders: {
            flexDirection: 'row',
            justifyContent: "center"
        },
        inpute: {
            padding: 15,
            fontSize: 28,
            fontFamily: 'capriola',
            borderBottomColor: "#e4e4e4",
            borderBottomWidth: 1
        },
        toggleCont: {
            marginTop : 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        toggle: {
            backgroundColor: "#d4d4d4",
            borderRadius: 16,
            flexDirection: 'row'
        },
        toggleBtnActive: {
            width : 50,
            height :25,
            borderRadius: 16,
            backgroundColor: "#201f2d",
            alignItems:'center',
            justifyContent : 'center'
        },
        toggleBtn: {
            width : 40,
            height :25,
            borderRadius:16,
            backgroundColor: "transparent",
            alignItems:'center',
            justifyContent : 'center'
        }

    })

    const onUnitClick = (toggle)=>{
        setisFeet(toggle)
        if(height === '') {return}
        if(toggle && height > 0){
            updateState('height', `${(parseFloat(height)/30.48).toFixed(2)}`) 
        }
        else{
            updateState('height', `${(parseFloat(height) * 30.48).toFixed(2)}`) 
        }
    }

    return (
        <View style={styles.contaiver}>
            <View style={styles.textCont}>
                <Text style={styles.heading}> What's your height?</Text>

                <View style={styles.toggleCont}>
                    <View style={styles.toggle}>
                        <Pressable onPress={()=>onUnitClick(false)} style={ isFeet ? styles.toggleBtn : styles.toggleBtnActive}>
                           <Text style={{color:'white'}}>cm</Text> 
                        </Pressable>
                        <Pressable onPress={()=>onUnitClick(true)} style={isFeet ? styles.toggleBtnActive : styles.toggleBtn}>
                        <Text style={{color:'white'}}>ft</Text> 
                        </Pressable>
                    </View>

                </View>
            </View>

            <View style={styles.genders}>
                <TextInput
                    style={styles.inpute}
                    value={height}
                    onChangeText={(text) => setheight(text)}
                    keyboardType='numeric'
                    placeholder='Your height'
                />
                <Text style={{alignSelf : 'center', fontSize : 16, fontFamily : 'work-san'}}>
                  {
                    isFeet ? 'ft' : 'cm'
                  }  
                </Text>
            </View>

            <View style={styles.btncontainer}>
                {
                     height.length === 0 ?
                        <View
                            style={styles.btn}>
                            <Text style={styles.btnText}>LET'S GO</Text>
                        </View>
                        :
                        <Pressable onPress={()=>{
                            updateState('height', height);
                            goNext()
                            }}>
                            <LinearGradient
                                style={styles.btn}
                                colors={['#194769', '#201f2d', '#5E7E96']}>
                                <Text style={styles.btnText}>LET'S GO</Text>
                            </LinearGradient>
                        </Pressable>
                }

            </View>

        </View>
    )
}

export default Height