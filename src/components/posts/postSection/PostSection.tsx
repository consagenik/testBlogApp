import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import Loader from '../../loader/Loader.tsx';
import PostBody from '../postBody/PostBody.tsx';
import EditPost from '../editPost/EditPost.tsx';
import {useAppSelector} from '../../../state/hooks.ts';
import {PostBLModel} from '../../../entities/PostBLModel.ts';
import {Api} from '../../../api';

export default function PostSection() {
  const {selectedPostId, editPost} = useAppSelector(state => state.post);

  const [post, setPost] = useState<PostBLModel | undefined>(undefined);
  const [postLoaded, setPostLoaded] = useState(false);

  async function getPost(id: number) {
    try {
      const resp = await Api.getPostById(id);
      setPost(resp);
      setPostLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    } finally {
      setPostLoaded(true);
    }
  }

  function updatePostHandler(data: PostBLModel) {
    setPost(data);
  }

  useEffect(() => {
    if (selectedPostId) {
      getPost(selectedPostId);
    }
  }, [selectedPostId]);

  const initialValues = {
    title: post ? post.title : '',
    body: post ? post.body : '',
  };

  return (
    <View>
      {!editPost && !postLoaded && <Loader text="Loading post..." />}

      {!editPost && postLoaded && post && (
        <PostBody body={post.body} title={post.title} />
      )}

      {editPost && (
        <EditPost
          initialValues={initialValues}
          createPost={post === undefined}
          updatePostHandler={updatePostHandler}
        />
      )}
    </View>
  );
}
