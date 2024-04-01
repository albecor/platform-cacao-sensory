import React from 'react';
import { Center, VStack } from 'native-base';
import Loading from '../../atoms/Loading';
import BSText from '../../atoms/Text';
import { Colors } from '../../Theme';

const LoadingScreen = () => (
  <Center flex={1} px='3'>
    <VStack space={2} alignItems='center'>
      <Loading color={Colors.baseColor.greenPrimary} />
      <BSText.Title color={Colors.baseColor.greenPrimary} text='Cargando' />
    </VStack>
  </Center>
);

export default LoadingScreen;
