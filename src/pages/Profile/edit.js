import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateInfo } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_SUCCESS
} from '../../context/types';
import FormLayout from '../../patterns/molecules/Form';
import InputContainer from '../../patterns/molecules/Form/inputContainer';
import ModalForm from '../../patterns/molecules/Modal/ModalForm';
import { isMobile, isNumeric } from '../../utils';
import { getItem } from '../../utils/Keychain';

const EditProfile = ({ data, handleDismiss }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const [, dispatch] = useCacaoContext();
  const [submitting, setSubmitting] = useState(true);
  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const token = await getItem('token');
      await updateInfo(values, token);
      setSubmitting(false);
      dispatch({
        type: NOTIFY_SUCCESS,
        value: {
          title: 'Información modificada!',
          message: '',
          btnText: 'Continuar',
          onPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
            handleDismiss(values);
          }
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
        handleDismiss={() => handleDismiss()}
        handleSubmit={handleSubmit(onSubmit)}
        rightButtonLabel='Guardar'
        rightButton
        submitting={submitting}
      />
      <FormLayout>
        <ModalForm.Body requiredText={false}>
          <InputContainer
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            name='name'
            label='Nombre'
            defaultValue={data.name}
            hasError={!!errors.name}
            rules={{ required: true }}
          />
          <InputContainer
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            name='document'
            label='Documento'
            inputProps={{ keyboardType: 'numeric' }}
            defaultValue={data.document.toString()}
            hasError={!!errors.document}
            inputError={
              (errors.document?.type === 'required' && 'Documento es requerido') ||
              (errors.document?.type === 'validate' && 'Documento no válido') ||
              (errors.document?.type === 'minLength' &&
                'Documento debe ser mínimo de 7') ||
              (errors.document?.type === 'maxLength' &&
                'Documento debe ser máximo de 11')
            }
            rules={{
              required: true,
              validate: (val) => {
                if (val === '') return true;
                return isNumeric(val.toString());
              },
              minLength: 7,
              maxLength: 11
            }}
          />
          <InputContainer.Email
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            defaultValue={data.email}
            error={errors.email}
          />
          <InputContainer
            callback={() => setSubmitting(prevState => prevState && false)}
            control={control}
            name='mobile'
            label='Número de celular'
            defaultValue={data.mobile.toString()}
            inputProps={{ keyboardType: 'phone-pad' }}
            hasError={!!errors.mobile}
            rules={{
              required: true,
              validate: (val) => {
                if (val === '') return true;
                return isMobile(val.toString());
              }
            }}
            inputError={
              (errors.mobile?.type === 'required' && 'Número de celular requerido') ||
              (errors.mobile?.type === 'validate' && 'Número de celular no válido')
            }
          />
        </ModalForm.Body>
      </FormLayout>
    </ModalForm>
  );
};

EditProfile.propTypes = {
  data: shape({}),
  handleDismiss: func
};

export default EditProfile;
