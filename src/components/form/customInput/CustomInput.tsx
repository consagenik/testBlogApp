import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';

import styles from './CustomInput.styles';

interface CustomInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  textarea?: boolean;
  extraStyles?: object;
}

export default function CustomInput({
  label,
  placeholder,
  textarea,
  extraStyles,
  ...rest
}: CustomInputProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#000"
        style={
          textarea
            ? {
                ...styles.customTextField,
                ...styles.customTextArea,
                ...(extraStyles || {}),
              }
            : {...styles.customTextField, ...(extraStyles || {})}
        }
        {...rest}
      />
    </View>
  );
}
