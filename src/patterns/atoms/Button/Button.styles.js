import { Elevations, Forms } from '../../Theme';

export default {
  buttonGradient: {
    ...Forms.defaultPrimaryButton,
    ...Elevations.buttonElevation,
    alignItems: 'center',
    marginBottom: 30
  },
  btnText: {
    ...Forms.defaultPrimaryButtonText
  },
  gradientWrapper: {
    width: '100%',
    height: 47
  }
};
