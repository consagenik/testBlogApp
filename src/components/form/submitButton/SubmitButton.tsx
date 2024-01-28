import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './SubmitButton.styles';

interface SubmitButtonProps {
  onPress: () => void;
  text?: string;
  extraButtonStyles?: object;
  extraTextStyles?: object;
}

export default function SubmitButton({
  onPress,
  text = 'Submit',
  extraButtonStyles,
  extraTextStyles,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.button, ...extraButtonStyles}}>
      <Text style={{...styles.buttonText, ...extraTextStyles}}>{text}</Text>
    </TouchableOpacity>
  );
}
