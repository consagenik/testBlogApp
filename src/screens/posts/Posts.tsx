import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import styles from './Posts.styles';

import {setPosts, setSelectedPostId} from '../../state/slices/postSlice.ts';
import {Api} from '../../api';
import {useAppDispatch, useAppSelector} from '../../state/hooks.ts';
import PostBody from '../../components/posts/postBody/PostBody.tsx';
import EmptyList from '../../components/emptyList/EmptyList.tsx';
import Loader from '../../components/loader/Loader.tsx';

export default function Posts({navigation}: any) {
  const dispatch = useAppDispatch();

  const {posts} = useAppSelector(state => state.post);

  const [postsLoaded, setPostsLoaded] = useState(false);

  async function getPosts() {
    try {
      const resp = await Api.getPosts();
      dispatch(setPosts(resp));
      setPostsLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  function goToPost(id: number) {
    dispatch(setSelectedPostId(id));
    navigation.navigate('Post', {id});
  }

  console.log(posts);

  return (
    <View style={styles.posts}>
      {!postsLoaded && <Loader text="Loading posts..." />}

      {postsLoaded && posts.length === 0 && <EmptyList text="No posts" />}

      {postsLoaded && posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => goToPost(item.id!)}
              style={
                index === posts.length - 1 ? styles.lastItem : styles.item
              }>
              <PostBody body={item.body} title={item.title} shorted />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
