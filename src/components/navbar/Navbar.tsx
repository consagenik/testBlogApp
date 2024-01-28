import React from 'react';
import {Text, View} from 'react-native';

import styles from './Navbar.styles';

import {AddIcon, ArrowLeftIcon} from '../../assets';
import CustomButton from '../customButton/CustomButton.tsx';
import {useAppDispatch} from '../../state/hooks.ts';
import {setEditPost} from '../../state/slices/postSlice.ts';

interface NavbarProps {
  title: string;
  navigation: any;
  arrowBack?: boolean;
  addPost?: boolean;
}

export default function Navbar({
  title,
  navigation,
  arrowBack,
  addPost,
}: NavbarProps) {
  const dispatch = useAppDispatch();

  function navigateToAddPost() {
    dispatch(setEditPost(true));
    navigation.navigate('Post');
  }

  return (
    <View style={styles.navbar}>
      {arrowBack ? (
        <CustomButton onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </CustomButton>
      ) : (
        <View style={styles.emptyView} />
      )}
      <Text style={styles.title}>{title}</Text>
      {addPost ? (
        <CustomButton onPress={navigateToAddPost}>
          <AddIcon />
        </CustomButton>
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
}
