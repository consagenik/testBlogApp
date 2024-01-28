import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './EditCommentForm.styles.ts';

import SectionTitle from '../../sectionTitle/SectionTitle.tsx';
import CustomInput from '../../form/customInput/CustomInput.tsx';
import SubmitButton from '../../form/submitButton/SubmitButton.tsx';
import CustomButton from '../../customButton/CustomButton.tsx';
import {CancelIcon} from '../../../assets';

interface FormValues {
  text: string;
}

const PostSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

interface EditCommentFormProps {
  handleCancel: () => void;
  handleSave: (data: {text: string}) => void;
  initialValues: FormValues;
}

export default function EditCommentForm({
  handleCancel,
  handleSave,
  initialValues,
}: EditCommentFormProps) {
  return (
    <View style={styles.editCommentWrapper}>
      <SectionTitle text="Edit comment" />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSave}
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
            <View style={styles.buttonsRow}>
              <CustomButton onPress={handleCancel}>
                <CancelIcon />
              </CustomButton>
              <SubmitButton
                text="Save"
                onPress={handleSubmit}
                extraButtonStyles={styles.extraButtonStyles}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
