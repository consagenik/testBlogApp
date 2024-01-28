import React from 'react';
import {Text} from 'react-native';

import styles from './EmptyList.styles';

interface EmptyListProps {
  text: string;
}

export default function EmptyList({text}: EmptyListProps) {
  return <Text style={styles.emptyListTitle}>{text}</Text>;
}
