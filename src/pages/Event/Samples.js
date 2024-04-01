import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { Box, Center, Pressable, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { updateEvent } from '../../api';
import { useCacaoContext } from '../../context';
import {
  NOTIFY_CLEAN, NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_LOADER,
  NOTIFY_WARNING
} from '../../context/types';
import Footer from '../../patterns/atoms/Footer';
import { Colors } from '../../patterns/Theme';
import { getItem } from '../../utils/Keychain';
import EventLayout from './Layout';

const EventSamples = ({
  callback,
  eventId,
  leaderId,
  samples,
  samplesCompleted,
  setTitle,
  setSampleSelected,
  setStep
}) => {
  const [controller, dispatch] = useCacaoContext();
  const handleSample = ({ code, _id }) => {
    if (samplesCompleted.includes(_id)) { return true; }
    setTitle(`Muestra - ${code}`);
    setSampleSelected(_id);
    setStep(prevState => ++prevState);
  };
  const handleSubmit = async () => {
    try {
      const token = await getItem('token');
      dispatch({
        type: NOTIFY_WARNING,
        value: {
          title: 'Confirmación',
          message: '¿Está seguro de finalizar el evento ?',
          btnText: 'Finalizar',
          btnSecondText: 'Cancelar',
          onPress: async () => {
            dispatch({ type: NOTIFY_CLEAN });
            dispatch({ type: NOTIFY_LOADER });
            await updateEvent(eventId, {
              activated: false,
              endAt: new Date()
            }, token);
            callback();
          },
          onSecondPress: () => {
            dispatch({ type: NOTIFY_CLEAN });
          }
        }
      });
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
      <EventLayout title='Elija la muestra: '>
        <VStack space={2}>
          {
            samples.map(sample => (
              <Pressable
                key={sample._id}
                onPress={() => handleSample(sample)}
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
                  {sample.code}
                  {samplesCompleted.includes(sample._id) && (
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
            ))
          }
        </VStack>
      </EventLayout>
      {leaderId === controller.user._id && (
        <Footer
          btnPrimaryText='Finalizar'
          btnPrimary={handleSubmit}
          btnPrimaryProps={{
            isDisabled: !(samplesCompleted.length === samples.length)
          }}
        />
      )}
    </>
  );
};

EventSamples.propTypes = {
  eventId: string.isRequired,
  leaderId: string.isRequired,
  callback: func.isRequired,
  samples: arrayOf(shape({})).isRequired,
  samplesCompleted: arrayOf(string).isRequired,
  setTitle: func.isRequired,
  setSampleSelected: func.isRequired,
  setStep: func.isRequired
};

export default EventSamples;
