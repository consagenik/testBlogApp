import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Posts from '../screens/posts/Posts.tsx';
import Post from '../screens/post/Post.tsx';
import Navbar from '../components/navbar/Navbar.tsx';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    /*@ts-ignore*/
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={{
            header: props => <Navbar title="Posts" addPost {...props} />,
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            header: props => <Navbar title="Post" arrowBack {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
