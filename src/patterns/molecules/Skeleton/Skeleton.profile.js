import React from 'react';
import { Box, Skeleton, VStack } from 'native-base';
import SkeletonBox from './Skeleton.box';

const SkeletonItem = () => (
  <SkeletonBox
    width='90%'
    height='60px'
  />
);

const SkeletonProfile = () => (
  <VStack space={4} alignItems='center' widh='100%'>
    <Skeleton
      startColor='warmGray.300'
      endColor='coolGray.400'
      size={120}
      borderRadius='full'
    />
    <SkeletonBox
      size={180}
      height='20px'
    />
    <Box h={15} />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </VStack>
);

export default SkeletonProfile;
