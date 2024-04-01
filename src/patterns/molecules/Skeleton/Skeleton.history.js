import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from 'native-base';
import SkeletonBox from './Skeleton.box';

const SkeletonItem = () => (
  <SkeletonBox
    width='90%'
    height='92px'
    borderRadius={15}
  />
);

const SkeletonHistory = () => (
  <ScrollView>
    <VStack space={4} alignItems='center' widh='100%'>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <Box h={120} />
    </VStack>
  </ScrollView>
);

export default SkeletonHistory;
