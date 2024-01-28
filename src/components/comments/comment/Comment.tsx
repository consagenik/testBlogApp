import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import styles from './Comment.styles.ts';
import CustomButton from '../../customButton/CustomButton.tsx';
import {Api} from '../../../api';
import {DeleteIcon, EditIcon} from '../../../assets';
import {useAppDispatch, useAppSelector} from '../../../state/hooks.ts';
import {
  deleteComment,
  updateComment,
} from '../../../state/slices/commentSlice.ts';
import EditCommentForm from '../editCommentForm/EditCommentForm.tsx';
import {CommentBLModel} from '../../../entities/CommentBLModel.ts';

interface CommentProps {
  id: number;
}

export default function Comment({id}: CommentProps) {
  const dispatch = useAppDispatch();

  const {comments} = useAppSelector(state => state.comment);

  const [comment, setComment] = useState<CommentBLModel>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setComment(comments.find(comment => comment.id === id));
  }, [id]);

  async function handleDelete() {
    try {
      await Api.deleteComment(id);
      dispatch(deleteComment(id));
    } catch (e) {
      console.log('API ERROR:', e);
    }
  }

  async function handleSave(data: CommentBLModel) {
    try {
      await Api.editComment(id, data);
      dispatch(updateComment(data));
      setComment({...comment, ...data});
      setIsEditing(false);
    } catch (e) {
      console.log('API ERROR:', e);
    }
  }

  async function handleCancel() {
    setIsEditing(false);
  }

  return (
    <View>
      {isEditing ? (
        <EditCommentForm
          handleCancel={handleCancel}
          handleSave={handleSave}
          initialValues={comment!}
        />
      ) : (
        <Text key={id} style={styles.commentText}>
          {comment?.text}
        </Text>
      )}

      {!isEditing && (
        <View style={styles.buttonsRow}>
          <CustomButton onPress={() => setIsEditing(true)}>
            <EditIcon />
          </CustomButton>

          <CustomButton onPress={handleDelete}>
            <DeleteIcon />
          </CustomButton>
        </View>
      )}

      <View style={styles.horizontalLine} />
    </View>
  );
}
