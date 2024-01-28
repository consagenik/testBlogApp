import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import SectionTitle from '../../sectionTitle/SectionTitle.tsx';

import styles from './EditPost.styles.ts';
import CustomInput from '../../form/customInput/CustomInput.tsx';
import SubmitButton from '../../form/submitButton/SubmitButton.tsx';
import {Api} from '../../../api';
import {useNavigation} from '@react-navigation/native';
import {PostBLModel} from '../../../entities/PostBLModel.ts';
import {useAppDispatch, useAppSelector} from '../../../state/hooks.ts';
import {
  addPost,
  setEditPost,
  updatePost,
} from '../../../state/slices/postSlice.ts';

interface FormValues {
  title: string | undefined;
  body: string | undefined;
}

interface EditPostProps {
  initialValues: FormValues;
  updatePostHandler: (post: PostBLModel) => void;
  createPost?: boolean;
}

const PostSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  body: Yup.string().required('Required'),
});

export default function EditPost({
  createPost,
  initialValues,
  updatePostHandler,
}: EditPostProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {selectedPostId} = useAppSelector(state => state.post);

  async function handleSubmitForm(values: FormValues) {
    if (values.title && values.body) {
      if (createPost) {
        await Api.createPost(values as PostBLModel).then(res => {
          dispatch(addPost(res));
          // @ts-ignore
          navigation.navigate('Posts');
        });
      } else if (selectedPostId) {
        await Api.editPost(selectedPostId, values as PostBLModel);
        dispatch(updatePost(values as PostBLModel));
        dispatch(setEditPost(false));
        updatePostHandler(values as PostBLModel);
      }
    }
  }

  return (
    <View style={styles.editPostWrapper}>
      <SectionTitle text={createPost ? 'Create post' : 'Edit post'} />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={PostSchema}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <View style={styles.fieldWrapper}>
              <CustomInput
                label="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <CustomInput
                label="Body"
                multiline={true}
                numberOfLines={6}
                onChangeText={handleChange('body')}
                onBlur={handleBlur('body')}
                value={values.body}
                textarea
              />
            </View>
            <SubmitButton onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
