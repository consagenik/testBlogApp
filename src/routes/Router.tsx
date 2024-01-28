import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Posts from '../screens/posts/Posts.tsx';
import Post from '../screens/post/Post.tsx';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    /*@ts-ignore*/
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
