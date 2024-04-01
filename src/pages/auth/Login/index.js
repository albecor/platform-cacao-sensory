import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSamplesStates, getAuthToken, getProfile } from '../../../api';
import { useCacaoContext } from '../../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR, STATES, USER,
  USER_LOGIN_IN
} from '../../../context/types';
import BSText from '../../../patterns/atoms/Text';
import InputContainer from '../../../patterns/molecules/Form/inputContainer';
import { Colors } from '../../../patterns/Theme';
import { saveItem } from '../../../utils/Keychain';
import AuthContainer from '../Container';
import styles from '../Auth.styles';

const Login = () => {
  const navigation = useNavigation();
  const [, dispatch] = useCacaoContext();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { token } = await getAuthToken(values);
      await saveItem('token', token);
      const { data } = await getProfile(token);
      const states = await fetchSamplesStates(token);
      dispatch({ type: USER, value: data });
      dispatch({ type: STATES, value: states });
      dispatch({ type: USER_LOGIN_IN });
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
      btnText='INGRESAR'
      loading={loading}
      onPress={handleSubmit(onSubmit)}
      text='BIENVENIDO'
    >
      <View>
        <View style={styles.inputGroup}>
          <InputContainer.Email
            control={control}
            error={errors.email}
            mt={0}
          />
        </View>
        <View style={styles.inputGroup}>
          <InputContainer.Password
            control={control}
            error={errors.password}
            mt={0}
          />
        </View>
      </View>
      <View style={styles.loginLinks}>
        <BSText.Link
          color={Colors.formColorScheme.linkText}
          onPress={() => navigation.navigate('Recover')}
          text='Olvidó su contraseña?'
        />
      </View>
    </AuthContainer>
  );
};

export default Login;
