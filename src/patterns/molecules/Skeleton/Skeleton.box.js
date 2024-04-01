import React from 'react';
import { Skeleton } from 'native-base';

const SkeletonBox = props => (
  <Skeleton
    {...props}
    startColor='warmGray.300'
    endColor='coolGray.400'
  />
);

export default SkeletonBox;
