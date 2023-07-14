import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
       

const UpperCard = ({count, subtitle, tagNum, icon}) => {

    const styles = StyleSheet.create({
        cards: {
          borderRadius: 15,
          padding: 10,
          backgroundColor: 'gray',
          flex: 1
        },
        card_title : {
          backgroundColor : 'transparent',
          flexDirection :'row',
          justifyContent:'space-between',
          alignItems:'center'
        },
        card_no : {
          fontFamily : 'capriola',
          fontSize : 30,
          color : "white",
        },
        subtitle : {
          fontFamily : 'work-san',
          fontSize : 18,
          color : "white",
        },
        tag : {
          fontFamily : 'work-san',
          fontSize : 16,
          color : "white",
        },
    
      })

    return (
        <View style={styles.cards}>
            <View style={styles.card_title}>
                <Text style={styles.card_no}>{count}</Text>
                {icon}
            </View>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.tag}>{tagNum}</Text>
        </View>
    )
}

export default UpperCard