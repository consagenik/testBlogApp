import React from 'react';
import {Text} from 'react-native';

import styles from './Loader.styles';

interface LoaderProps {
  text: string;
}

export default function Loader({text}: LoaderProps) {
  return <Text style={styles.loadingText}>{text}</Text>;
}
