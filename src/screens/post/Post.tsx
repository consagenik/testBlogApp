import React, {useEffect} from 'react';
import {View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../state/hooks.ts';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper.tsx';
import {setEditPost, setSelectedPostId} from '../../state/slices/postSlice.ts';
import CommentsSection from '../../components/comments/commentsSection/CommentsSection.tsx';
import PostSection from '../../components/posts/postSection/PostSection.tsx';

export default function Post() {
  const dispatch = useAppDispatch();

  const {selectedPostId} = useAppSelector(state => state.post);

  useEffect(() => {
    return () => {
      dispatch(setSelectedPostId(undefined));
      dispatch(setEditPost(false));
    };
  }, [dispatch]);

  return (
    <ContentWrapper>
      <View>
        <PostSection />

        {selectedPostId && <CommentsSection />}
      </View>
    </ContentWrapper>
  );
}
