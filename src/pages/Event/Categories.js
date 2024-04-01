import React from 'react';
import { func, shape, string } from 'prop-types';
import { Box, Center, Pressable, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { addSample, updateSample } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_LOADER
} from '../../context/types';
import Footer from '../../patterns/atoms/Footer';
import { Colors } from '../../patterns/Theme';
import { getItem } from '../../utils/Keychain';
import EventLayout from './Layout';
import ModalSample from './ModalSample';

const categories = {
  smell: { label: 'Aroma', hasForm: false },
  acidity: { label: 'Acidez', hasForm: false },
  bitterness: { label: 'Amargor', hasForm: false },
  astringency: { label: 'Astringencia', hasForm: false },
  defects: { label: 'Defectos', hasForm: false },
  flavor: { label: 'Sabor', hasForm: false },
  aftertaste: { label: 'Pos Gusto', hasForm: false },
  points: { label: 'Puntaje catador', hasForm: true },
  comments: { label: 'Comentarios', hasForm: true }
};

const EventCategories = ({
  callback,
  event,
  handleBack,
  sampleSelected,
  sampleResults,
  setCategorySelected,
  setIntensity,
  setStep,
  setTitle,
  setValue
}) => {
  const [controller, dispatch] = useCacaoContext();
  const [modal, setModal] = React.useState(false);
  const handleCategory = (value, info) => {
    setTitle(`Categoria - ${info.label}`);
    if (info.hasForm) {
      setStep(value === 'points' ? 3 : 4);
      const values = event.data[sampleSelected][controller.user._id][value];
      if (values) {
        setValue(value, values.value.toString());
      }
    } else {
      setCategorySelected(value);
      setStep(prevState => ++prevState);
      if (event.data[sampleSelected] && event.data[sampleSelected][controller.user._id]) {
        const values = event.data[sampleSelected][controller.user._id][value];
        if (values) {
          setIntensity(values.intensity);
          setValue('quality', values.quality.toString());
          if (values.descriptors) setValue('descriptors', values.descriptors);
          if (values.notes) setValue('notes', values.notes);
        }
      }
    }
  };
  const handleDisabled = () => {
    if (sampleResults[sampleSelected] && sampleResults[sampleSelected][controller.user._id]) {
      return sampleResults[sampleSelected][controller.user._id]?.length !==
          (Object.keys(categories).length - (sampleResults[sampleSelected][controller.user._id].includes('comments') ? 0 : 1));
    }
    return true;
  };
  const onSubmit = async () => {
    try {
      dispatch({ type: NOTIFY_LOADER });
      const token = await getItem('token');
      await addSample({ id: event._id, sample: sampleSelected }, token);
      await updateSample({
        event: event._id,
        state: controller.states.find(s => s.order === 8)._id,
        owner: controller.user._id
      },
      token);
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
      <EventLayout title='Elija la categoría: '>
        <VStack space={2} mb={10}>
          {Object.entries(categories).map(([key, values], index) => (
            <Pressable
              key={index}
              onPress={() => handleCategory(key, values)}
            >
              <Box
                bg='transparent'
                p='6'
                borderColor={Colors.baseColor.redPrimary}
                borderWidth='1'
                rounded='xl'
                _text={{
                  fontSize: 'md',
                  fontWeight: 'medium',
                  color: Colors.baseColor.redPrimary,
                  textAlign: 'center'
                }}
              >
                {values.label}
                {!!(sampleResults[sampleSelected] && sampleResults[sampleSelected][controller.user._id]?.includes(key)) && (
                  <Center
                    position='absolute'
                    bottom='50%'
                    right='0'
                    px='3'
                    py='1.5'
                  >
                    <Ionicons name='checkmark-circle-outline' size={28} color={Colors.baseColor.greenPrimary} />
                  </Center>
                )}
              </Box>
            </Pressable>
          ))}
        </VStack>
      </EventLayout>
      <Footer
        btnPrimaryText='Finalizar'
        btnPrimary={() => setModal(true)}
        btnPrimaryProps={{ isDisabled: handleDisabled() }}
        btnSecondaryText='Atrás'
        btnSecondary={handleBack}
      />
      {modal && (
        <ModalSample
          categories={Object.keys(categories).length - 1}
          closeModal={() => setModal(false)}
          event={event}
          onSubmit={onSubmit}
          sampleSelected={sampleSelected}
        />
      )}
    </>
  );
};

EventCategories.propTypes = {
  callback: func.isRequired,
  event: shape({}).isRequired,
  handleBack: func.isRequired,
  sampleSelected: string.isRequired,
  sampleResults: shape({}).isRequired,
  setCategorySelected: func.isRequired,
  setIntensity: func.isRequired,
  setTitle: func.isRequired,
  setStep: func.isRequired,
  setValue: func.isRequired
};

export default EventCategories;
