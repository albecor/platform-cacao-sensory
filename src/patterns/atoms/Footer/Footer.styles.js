import { Dimensions } from 'react-native';
import { Colors } from '../../Theme';

export default function Styles ({ hasTwoButton = false }) {
  return {
    container: {
      minHeight: hasTwoButton ? 110 : 70,
      paddingTop: 10
    },
    button: {
      borderRadius: 100,
      width: Dimensions.get('window').width * 0.9
    },
    buttonPrimary: {
      backgroundColor: Colors.baseColor.greenPrimary
    },
    buttonPrimaryLabel: {
      color: Colors.modalColorScheme.primaryActionText
    },
    buttonSecondary: {
      borderColor: Colors.modalColorScheme.secondaryAction,
      borderWidth: 1
    },
    buttonSecondaryLabel: {
      color: Colors.modalColorScheme.secondaryActionText
    }
  };
}
