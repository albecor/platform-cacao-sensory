import { MaterialIcons } from '@expo/vector-icons';
import { Box, Icon } from 'native-base';
import { func } from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { updatePassword } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_SUCCESS
} from '../../context/types';
import BSText from '../../patterns/atoms/Text';
import FormLayout from '../../patterns/molecules/Form';
import InputContainer from '../../patterns/molecules/Form/inputContainer';
import ModalForm from '../../patterns/molecules/Modal/ModalForm';
import { getItem } from '../../utils/Keychain';
import Styles from './profile.styles';

const styles = StyleSheet.create(Styles);

const ModifyPassword = ({ handleDismiss }) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const [, dispatch] = useCacaoContext();
  const [submitting, setSubmitting] = useState(true);
  const [visible, setVisible] = useState(false);
  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const token = await getItem('token');
      await updatePassword(values, token);
      setSubmitting(false);
      dispatch({
        type: NOTIFY_SUCCESS,
        value: {
          title: 'Contraseña modificada!',
          message: '',
          btnText: 'Continuar',
          onPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
            handleDismiss(values);
          },
          handleDismiss: handleDismiss
        }
      });
    } catch (e) {
      setSubmitting(false);
      if (e.errorCode === 401) {
        dispatch({ type: NOTIFY_EXPIRED });
      } else {
        dispatch({
          type: NOTIFY_ERROR,
          value: {
            title: e.errorCode,
            message: e.errorMessage || e.response.data.message,
            btnText: 'Intentar de nuevo',
            onPress: () => {
              dispatch({ type: NOTIFY_CLEAN });
            }
          }
        });
      }
    }
  };
  return (
    <ModalForm onRequestClose={handleDismiss}>
      <ModalForm.Header
        handleDismiss={handleDismiss}
        handleSubmit={handleSubmit(onSubmit)}
        rightButtonLabel='Cambiar'
        rightButton
        submitting={submitting}
      />
      <FormLayout>
        <ModalForm.Body requiredText={false}>
          <BSText.Title marginBottom={0} text='Requisitos de contraseña' />
          <Box mt={2}>
            <View style={styles.listItemContainer}>
              <BSText.Description marginBottom={0} text={'\u2022'} />
              <BSText.Description
                marginBottom={0}
                style={styles.listItemText}
                text='Mínimo 8 caracteres'
              />
            </View>
            <View style={styles.listItemContainer}>
              <BSText.Description marginBottom={0} text={'\u2022'} />
              <BSText.Description
                marginBottom={0}
                style={styles.listItemText}
                text='Una mayúscula'
              />
            </View>
            <View style={styles.listItemContainer}>
              <BSText.Description marginBottom={0} text={'\u2022'} />
              <BSText.Description
                marginBottom={0}
                style={styles.listItemText}
                text='Una minúscula'
              />
            </View>
            <View style={styles.listItemContainer}>
              <BSText.Description marginBottom={0} text={'\u2022'} />
              <BSText.Description
                marginBottom={0}
                style={styles.listItemText}
                text='Un carácter especial'
              />
            </View>
            <View style={styles.listItemContainer}>
              <BSText.Description marginBottom={0} text={'\u2022'} />
              <BSText.Description
                marginBottom={0}
                style={styles.listItemText}
                text='Un número'
              />
            </View>
          </Box>
          <InputContainer.Password
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            error={errors.current}
            label='Contraseña actual'
            name='current'
          />
          <InputContainer.Password
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            error={errors.password}
            label='Nueva contraseña'
            name='password'
          />
          <InputContainer
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            name='confirm'
            label='Confirmar contraseña'
            inputProps={{
              secureTextEntry: !visible,
              InputRightElement: (
                <Pressable onPress={() => setVisible(prevState => !prevState)}>
                  <Icon
                    as={<MaterialIcons name={visible ? 'visibility-off' : 'visibility'} />}
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              )
            }}
            hasError={!!errors.confirm}
            inputError={
              (errors?.confirm?.type === 'required' &&
                'Contraseña es requerida') ||
              (errors?.confirm?.type === 'validate' &&
                'Las contraseñas no coinciden')
            }
            rules={{
              required: true,
              validate: (value) => value === getValues('password')
            }}
          />
        </ModalForm.Body>
      </FormLayout>
    </ModalForm>
  );
};

ModifyPassword.propTypes = {
  handleDismiss: func
};

export default ModifyPassword;
