/* eslint-disable react-hooks/rules-of-hooks */
import { func, number, shape, string } from 'prop-types';
import React from 'react';
import { Slider } from 'native-base';
import { addResult } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_LOADER
} from '../../context/types';
import Footer from '../../patterns/atoms/Footer';
import Input from '../../patterns/atoms/Input';
import InputContainer from '../../patterns/molecules/Form/inputContainer';
import { isFloat } from '../../utils';
import { getItem } from '../../utils/Keychain';
import EventLayout from './Layout';

const handleDisabled = (errors) => !(Object.keys(errors).length < 1);

const commonProps = {
  callback: func.isRequired,
  control: shape({}),
  errors: shape({}),
  eventId: string,
  handleBack: func.isRequired,
  handleSubmit: func.isRequired,
  sampleSelected: string
};

const EventValues = ({
  callback,
  categorySelected,
  control,
  eventId,
  errors,
  handleBack,
  handleSubmit,
  intensity,
  sampleSelected,
  setIntensity
}) => {
  const [controller, dispatch] = useCacaoContext();
  const onSubmit = async (data) => {
    try {
      const token = await getItem('token');
      const values = { intensity, quality: parseFloat(data.quality), ...data };
      dispatch({ type: NOTIFY_LOADER });
      await addResult(eventId, token, {
        sample: sampleSelected,
        tester: controller.user._id,
        category: categorySelected,
        ...values
      });
      callback();
    } catch (e) {
      if (e.errorCode === 401) {
        dispatch({ type: NOTIFY_EXPIRED });
      } else {
        dispatch({
          type: NOTIFY_ERROR,
          value: {
            title: e.errorCode,
            message: e.errorMessage || e.response.data.message[0],
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
    <>
      <EventLayout title='Llene la información: '>
        <Input.Label>Intensidad: {intensity}</Input.Label>
        <Slider
          colorScheme='green'
          minValue={0}
          maxValue={5}
          defaultValue={intensity}
          step={0.5}
          onChange={(v) => {
            setIntensity(v);
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <InputContainer control={control} label='Descriptores' name='descriptors' />
        <InputContainer
          control={control}
          label='Calidad (0-10)'
          name='quality'
          hasError={!!errors.quality}
          inputError={
            (errors.quality?.type === 'required' && 'Calidad requerida') ||
            (errors.quality?.type === 'validate' && 'Valor no válido') ||
            ((errors.quality?.type === 'minLength' || errors.quality?.type === 'maxLength') &&
              'La calidad debe estar entre 0.0 y 10')
          }
          rules={{
            required: true,
            validate: (val) => {
              if (val === '') return true;
              return isFloat(val.toString()) && (val >= 0 && val <= 10);
            },
            minLength: 1,
            maxLength: 3
          }}
          inputProps={{ keyboardType: 'numeric' }}
        />
        <InputContainer
          control={control}
          label='Comentarios'
          name='notes'
        />
      </EventLayout>
      <Footer
        btnPrimaryText='Guardar'
        btnPrimary={handleSubmit(onSubmit)}
        btnPrimaryProps={{ isDisabled: handleDisabled(errors) }}
        btnSecondaryText='Atrás'
        btnSecondary={handleBack}
      />
    </>
  );
};

EventValues.propTypes = {
  ...commonProps,
  intensity: number,
  setIntensity: func.isRequired
};

EventValues.Points = ({
  callback,
  control,
  errors,
  eventId,
  handleBack,
  handleSubmit,
  sampleSelected
}) => {
  const [controller, dispatch] = useCacaoContext();
  const onSubmit = async (data) => {
    try {
      const token = await getItem('token');
      const values = { category: 'points', value: parseFloat(data.points) };
      dispatch({ type: NOTIFY_LOADER });
      await addResult(eventId, token, {
        sample: sampleSelected,
        tester: controller.user._id,
        ...values
      });
      callback();
    } catch (e) {
      if (e.errorCode === 401) {
        dispatch({ type: NOTIFY_EXPIRED });
      } else {
        dispatch({
          type: NOTIFY_ERROR,
          value: {
            title: e.errorCode,
            message: e.errorMessage || e.response.data.message[0],
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
    <>
      <EventLayout title=''>
        <InputContainer
          control={control}
          label='Puntajes de catador (0-10)'
          name='points'
          hasError={!!errors.points}
          inputError={
            (errors.points?.type === 'required' && 'Puntaje requerido') ||
            (errors.points?.type === 'validate' && 'Valor no válido') ||
            ((errors.points?.type === 'minLength' || errors.points?.type === 'maxLength') &&
              'El puntaje debe estar entre 0.0 y 10')
          }
          rules={{
            required: true,
            validate: (val) => {
              if (val === '') return true;
              console.log(val);
              return isFloat(val.toString()) && (val >= 0 && val <= 10);
            },
            minLength: 1,
            maxLength: 3
          }}
          inputProps={{ keyboardType: 'numeric' }}
        />
      </EventLayout>
      <Footer
        btnPrimaryText='Guardar'
        btnPrimary={handleSubmit(onSubmit)}
        btnPrimaryProps={{ isDisabled: handleDisabled(errors) }}
        btnSecondaryText='Atrás'
        btnSecondary={handleBack}
      />
    </>
  );
};

EventValues.Points.propTypes = commonProps;

EventValues.Comments = ({
  callback,
  control,
  errors,
  eventId,
  handleBack,
  handleSubmit,
  sampleSelected
}) => {
  const [controller, dispatch] = useCacaoContext();
  const onSubmit = async (data) => {
    try {
      const token = await getItem('token');
      const values = { category: 'comments', value: data.comments };
      dispatch({ type: NOTIFY_LOADER });
      await addResult(eventId, token, {
        sample: sampleSelected,
        tester: controller.user._id,
        ...values
      });
      callback();
    } catch (e) {
      if (e.errorCode === 401) {
        dispatch({ type: NOTIFY_EXPIRED });
      } else {
        dispatch({
          type: NOTIFY_ERROR,
          value: {
            title: e.errorCode,
            message: e.errorMessage || e.response.data.message[0],
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
    <>
      <EventLayout title=''>
        <InputContainer
          control={control}
          label='Comentarios'
          name='comments'
          hasError={!!errors.comments}
          inputError={
            (errors.comments?.type === 'required' && 'Comentarios requeridos')
          }
          rules={{
            required: true,
            validate: (val) => {
              if (val === '') return true;
              return val.length > 0;
            }
          }}
        />
      </EventLayout>
      <Footer
        btnPrimaryText='Guardar'
        btnPrimary={handleSubmit(onSubmit)}
        btnPrimaryProps={{ isDisabled: handleDisabled(errors) }}
        btnSecondaryText='Atrás'
        btnSecondary={handleBack}
      />
    </>
  );
};

EventValues.Comments.propTypes = commonProps;

export default EventValues;
