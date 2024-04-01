import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { recoverPassword } from '../../../api';
import { useCacaoContext } from '../../../context';
import { NOTIFY_CLEAN, NOTIFY_ERROR, NOTIFY_SUCCESS } from '../../../context/types';
import InputContainer from '../../../patterns/molecules/Form/inputContainer';
import AuthContainer from '../Container';
import BSText from '../../../patterns/atoms/Text';
import { Colors } from '../../../patterns/Theme';
import styles from '../Auth.styles';

const Recover = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [, dispatch] = useCacaoContext();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await recoverPassword(data);
      setLoading(false);
      dispatch({
        type: NOTIFY_SUCCESS,
        value: {
          title: 'Correo enviado!',
          message: 'Un correo fue enviado con instrucciones para el cambio de contraseña.',
          btnText: 'Ok!',
          onPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
            navigation.navigate('Login');
          }
        }
      });
    } catch (err) {
      setLoading(false);
      dispatch({
        type: NOTIFY_ERROR,
        value: {
          title: err.errorCode,
          message: err.errorMessage || err.response.data.message,
          btnText: 'Intentar de nuevo',
          onPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
            setLoading(false);
          }
        }
      });
    }
  };
  return (
    <AuthContainer
      btnText='ENVIAR'
      loading={loading}
      onPress={handleSubmit(onSubmit)}
      text='Recuperar contraseña'
    >
      <View>
        <View style={styles.description}>
          <BSText.Description
            text='Se enviará un link a su correo para recuperar su contraseña'
            color={Colors.blackRussian}
            marginBottom={10}
          />
        </View>
        <View style={styles.inputGroup}>
          <InputContainer.Email
            control={control}
            error={errors.email}
            mt={0}
          />
        </View>
      </View>
    </AuthContainer>
  );
};

export default Recover;
