import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateProcess } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_SUCCESS
} from '../../context/types';
import AppBar from '../../patterns/atoms/AppBar';
import ButtonSubmit from '../../patterns/atoms/Button/ButtonSubmit';
import SafeArea from '../../patterns/atoms/SafeArea';
import Text from '../../patterns/atoms/Text';
import FormLayout from '../../patterns/molecules/Form';
import InputContainer from '../../patterns/molecules/Form/inputContainer';
import ModalForm from '../../patterns/molecules/Modal/ModalForm';
import { getItem } from '../../utils/Keychain';

const Process = ({ route }) => {
  const { process } = route.params;
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useCacaoContext();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const token = await getItem('token');
      await updateProcess(process._id, values, token);
      setLoading(false);
      dispatch({
        type: NOTIFY_SUCCESS,
        value: {
          title: 'Proceso actualizado!',
          message: '',
          btnText: 'Continuar',
          onPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
            navigation.navigate('Home');
          }
        }
      });
    } catch (e) {
      setLoading(false);
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
    <SafeArea>
      <AppBar>
        <AppBar.Back route='Home' />
        <AppBar.Title title={process.sample} />
        <AppBar.Title title='' />
      </AppBar>
      <FormLayout>
        <ModalForm.Body requiredText={false}>
          {
            process.notes && (
              <>
                <Text.Title text='Comentario previo' />
                <Text.Description text={process.notes} />
              </>
            )
          }
          <InputContainer.Area
            control={control}
            name='notes'
            label={`Por favor agregue las notas para el proceso de ${process.state.label}`}
            hasError={!!errors.notes}
            hasHint
            hint='Opcional'
            rules={{ required: false }}
          />
          <ButtonSubmit
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            text='Enviar'
          />
        </ModalForm.Body>
      </FormLayout>
    </SafeArea>
  );
};

export default Process;
