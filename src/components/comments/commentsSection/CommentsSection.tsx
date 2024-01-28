import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import styles from './CommentsSection.styles.ts';

import SectionTitle from '../../sectionTitle/SectionTitle.tsx';
import Loader from '../../loader/Loader.tsx';
import EmptyList from '../../emptyList/EmptyList.tsx';
import Comment from '../comment/Comment.tsx';
import {Api} from '../../../api';
import {useAppDispatch, useAppSelector} from '../../../state/hooks.ts';
import AddCommentForm from '../addCommentForm/AddCommentForm.tsx';
import {setComments} from '../../../state/slices/commentSlice.ts';

export default function CommentsSection() {
  const dispatch = useAppDispatch();

  const {selectedPostId} = useAppSelector(state => state.post);
  const {comments} = useAppSelector(state => state.comment);

  const [commentsLoaded, setCommentsLoaded] = useState(false);

  async function getPostComments(id: number) {
    try {
      const resp = await Api.getPostComments(id);
      dispatch(setComments(resp));
      setCommentsLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    } finally {
      setCommentsLoaded(true);
    }
  }

  useEffect(() => {
    if (selectedPostId) {
      getPostComments(selectedPostId);
    }
  }, [selectedPostId]);

  return (
    <View style={styles.commentsSectionWrapper}>
      {<SectionTitle text="Comments" />}

      {!commentsLoaded && <Loader text="Loading comments..." />}

      {commentsLoaded && comments.length === 0 && (
        <EmptyList text="No comments" />
      )}

      {commentsLoaded &&
        comments.length > 0 &&
        comments.map(comment => <Comment key={comment.id} id={comment.id!} />)}

      <AddCommentForm />
    </View>
  );
}
