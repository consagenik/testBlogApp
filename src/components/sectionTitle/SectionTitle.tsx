import React from 'react';
import {Text} from 'react-native';

import styles from './SectionTitle.styles';

interface SectionTitleProps {
  text: string;
}

export default function SectionTitle({text}: SectionTitleProps) {
  return <Text style={styles.sectionTitle}>{text}</Text>;
}
