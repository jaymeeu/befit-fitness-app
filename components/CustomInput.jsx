import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  activeIcon,
  inactiveIcon,
  prefix,
  editable,
  defaultValue,
  keyboardType,onBlur, onFocus
}) => {

  const colorScheme = useColorScheme()

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderBottomWidth: 1,
      borderRadius: 5,
      marginVertical: 8,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center'
  
    },
    input: {
      marginLeft: 7,
      flex: 1,
      backgroundColor: 'transparent',
      paddingVertical: 15,
  
      fontFamily: 'work-san'
    },
  });


  const [show, setshow] = useState(true)
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { value, onChange,  }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' :  Colors[colorScheme ?? 'light'].tabIconDefault },
            ]}>
            {
              value ?
                activeIcon
                :
                inactiveIcon
            }
            <Text style={{ marginLeft: 5 }}>{prefix}</Text>
            <TextInput
              onFocus={onFocus}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType={keyboardType}
              editable={editable} 
              selectTextOnFocus={editable}
              placeholder={placeholder}
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              style={styles.input}
              secureTextEntry={secureTextEntry && show}
            />
            {
              secureTextEntry &&
              <Pressable onPress={()=>setshow(!show)}>
                {
                  show ?
                    <Ionicons name="eye-off-outline" size={24} color="black" />
                    :
                    <Ionicons name="eye-outline" size={24} color="black" />
                }
              </Pressable>
            }
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch', fontSize:11 }}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};



export default CustomInput;
