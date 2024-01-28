import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import SectionTitle from '../../sectionTitle/SectionTitle.tsx';

import styles from './AddCommentForm.styles.ts';
import CustomInput from '../../form/customInput/CustomInput.tsx';
import SubmitButton from '../../form/submitButton/SubmitButton.tsx';
import {Api} from '../../../api';
import {useAppDispatch, useAppSelector} from '../../../state/hooks.ts';
import {addComment} from '../../../state/slices/commentSlice.ts';
import {CommentBLModel} from '../../../entities/CommentBLModel.ts';

interface FormValues {
  text: string | undefined;
}

const PostSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const initialValues = {
  text: '',
};

export default function AddCommentForm() {
  const dispatch = useAppDispatch();

  const {selectedPostId} = useAppSelector(state => state.post);

  async function handleSubmitForm(values: FormValues) {
    if (values.text) {
      await Api.createComment(selectedPostId!, values as CommentBLModel).then(
        res => {
          dispatch(addComment(res));
        },
      );
    }
  }

  return (
    <View style={styles.addCommentWrapper}>
      <SectionTitle text="Add comment" />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={PostSchema}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <View style={styles.fieldWrapper}>
              <CustomInput
                placeholder="Comment text"
                multiline={true}
                numberOfLines={6}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
                textarea
                extraStyles={styles.extraFieldStyles}
              />
            </View>
            <SubmitButton
              onPress={handleSubmit}
              extraButtonStyles={styles.extraButtonStyles}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
