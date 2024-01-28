import React from 'react';
import {ScrollView} from 'react-native';

import styles from './ContentWrapper.styles';

interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({children}: ContentWrapperProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      style={styles.wrapperBody}>
      {children}
    </ScrollView>
  );
}
