import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

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
              { borderColor: error ? 'red' : '#e8e8e8' },
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
              placeholderTextColor="#888888"
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#e8e8e8',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'none',
    alignItems: 'center'

  },
  input: {
    marginLeft: 7,
    flex: 1,
    backgroundColor: 'none',
    paddingVertical: 15,

    fontFamily: 'work-san'
  },
});

export default CustomInput;
