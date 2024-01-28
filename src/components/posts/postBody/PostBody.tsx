import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './PostBody.styles.ts';

import {EditIcon} from '../../../assets';
import {useAppDispatch} from '../../../state/hooks.ts';
import {setEditPost} from '../../../state/slices/postSlice.ts';

interface PostBodyProps {
  title: string;
  body: string;
  shorted?: boolean;
}

export default function PostBody({body, title, shorted}: PostBodyProps) {
  const dispatch = useAppDispatch();

  function handleEdit() {
    dispatch(setEditPost(true));
  }

  return (
    <View style={styles.post}>
      {!shorted && (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <EditIcon width={16} height={16} color="#555" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.postTitle}>{title}</Text>
      {shorted ? (
        <Text style={styles.postBody} numberOfLines={3}>
          {body}
        </Text>
      ) : (
        <Text style={styles.postBody}>{body}</Text>
      )}
    </View>
  );
}
