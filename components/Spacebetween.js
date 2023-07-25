import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Spacebetween = ({children}) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

export default Spacebetween

const styles = StyleSheet.create({
    container : {
        flexDirection  :'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        // backgroundColor : 'red'
    }
})