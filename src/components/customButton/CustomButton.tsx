import {TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './CustomButton.styles';

interface CustomButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
}

export default function CustomButton({onPress, children}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}
