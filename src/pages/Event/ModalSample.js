import React from 'react';
import { Button, Center, Flex } from 'native-base';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Styles from '../../patterns/atoms/Footer/Footer.styles';
import BSText from '../../patterns/atoms/Text';
import ModalForm from '../../patterns/molecules/Modal/ModalForm';
import { Colors } from '../../patterns/Theme';

const ModalSample = ({ categories, closeModal, event, onSubmit, sampleSelected }) => {
  const sampleInfo = event.samples.find(item => item._id === sampleSelected);
  const styles = StyleSheet.create(Styles({ hasTwoButton: false }));
  const RenderIcon = (testerId) => {
    let results = event.data[sampleSelected] && event.data[sampleSelected][testerId]
      ? Object.keys(event.data[sampleSelected][testerId])
      : [];
    results = results.filter(r => r !== 'comments');
    return (
      <Ionicons
        name={results.length === categories
          ? 'checkmark-circle-outline'
          : 'close-circle-outline'}
        size={28}
        color={Colors.baseColor[results.length === categories ? 'greenPrimary' : 'redPrimary']}
      />
    );
  };
  return (
    <ModalForm onRequestClose={closeModal}>
      <ModalForm.Header
        handleDismiss={closeModal}
      />
      <ModalForm.Body>
        <BSText.Title
          color={Colors.baseColor.greenPrimary}
          text={`Resultados parciales para la muestra ${sampleInfo.code}: `}
        />
        {
          event.testers.map(t => (
            <Flex direction='row' alignItems='center' key={t._id} p='6' my={2}>
              <BSText.Title text={t.name} />
              <Center pl='5' pb='3'>
                {RenderIcon(t._id)}
              </Center>
            </Flex>
          ))
        }
        <BSText.Title
          color={Colors.baseColor.redPrimary}
          text='¿Está seguro de finalizar el análisis para esta muestra?'
        />
        <Button
          style={[styles.button, styles.buttonPrimary]}
          onPress={onSubmit}
          variant='unstyled'
          _text={styles.buttonPrimaryLabel}
        >
          Finalizar
        </Button>
      </ModalForm.Body>
    </ModalForm>
  );
};

ModalSample.propTypes = {
  categories: number,
  closeModal: func,
  event: arrayOf(shape({})),
  onSubmit: func,
  sampleSelected: string
};

export default ModalSample;
