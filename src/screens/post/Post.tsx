import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import styles from './Post.styles';
import {useAppSelector} from '../../state/hooks.ts';
import {PostBLModel} from '../../entities/PostBLModel.ts';
import {Api} from '../../api';
import {CommentBLModel} from '../../entities/CommentBLModel.ts';

export default function Post() {
  const {selectedPostId} = useAppSelector(state => state.post);

  const [post, setPost] = useState<PostBLModel | undefined>(undefined);
  const [postLoaded, setPostLoaded] = useState(false);
  const [comments, setComments] = useState<CommentBLModel[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  async function getPost(id: number) {
    try {
      const resp = await Api.getPostById(id);
      console.log('getPost', resp);
      setPost(resp);
      setPostLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    } finally {
      setPostLoaded(true);
    }
  }

  async function getPostComments(id: number) {
    try {
      const resp = await Api.getPostComments(id);
      console.log('getPostComments', resp);
      setComments(resp);
      setCommentsLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    } finally {
      setCommentsLoaded(true);
    }
  }

  useEffect(() => {
    if (selectedPostId !== undefined) {
      getPost(selectedPostId);
      getPostComments(selectedPostId);
    }
  }, [selectedPostId]);

  return (
    <View style={styles.post}>
      <Text style={styles.sectionTitle}>Post</Text>

      {!postLoaded && <Text style={styles.loadingText}>Loading post...</Text>}

      {postLoaded && post && <Text style={styles.postTitle}>{post.title}</Text>}

      <Text style={styles.sectionTitle}>Comments</Text>

      {!commentsLoaded && (
        <Text style={styles.loadingText}>Loading comments...</Text>
      )}

      {commentsLoaded && comments.length === 0 && (
        <Text style={styles.emptyListTitle}>No comments</Text>
      )}

      {commentsLoaded &&
        comments.length > 0 &&
        comments.map(comment => (
          <Text key={comment.id} style={styles.postCommentText}>
            {comment.body}
          </Text>
        ))}
    </View>
  );
}
