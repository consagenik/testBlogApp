import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import styles from './Posts.styles';
import {setSelectedPostId} from '../../state/slices/postSlice.ts';
import {Api} from '../../api';
import {PostBLModel} from '../../entities/PostBLModel.ts';
import {useAppDispatch} from '../../state/hooks.ts';

export default function Posts({navigation}: any) {
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<PostBLModel[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  async function getPosts() {
    try {
      const resp = await Api.getPosts();
      setPosts(resp);
      setPostsLoaded(true);
    } catch (e) {
      console.log('API ERROR:', e);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  function goToPost(id: number) {
    console.log(id);
    dispatch(setSelectedPostId(id));
    navigation.navigate('Post', {id});
  }

  return (
    <View style={styles.posts}>
      {!postsLoaded && <Text style={styles.loadingText}>Loading posts...</Text>}

      {postsLoaded && posts.length === 0 && (
        <Text style={styles.postEmptyListTitle}>No posts</Text>
      )}

      {postsLoaded && posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({item}) => {
            console.log(item);
            return (
              <TouchableOpacity key={item.id} onPress={() => goToPost(item.id)}>
                <Text style={styles.postTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
