import React from 'react';
import { BackHandler } from 'react-native';
import { IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { fetchEvent } from '../../api';
import {
  NOTIFY_CLEAN,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_WARNING
} from '../../context/types';
import { useCacaoContext } from '../../context';
import { getItem } from '../../utils/Keychain';
import SafeArea from '../../patterns/atoms/SafeArea';
import AppBar from '../../patterns/atoms/AppBar';
import LoadingScreen from '../../patterns/molecules/LoadingScreen';
import { Colors } from '../../patterns/Theme';
import ModalHelp from './Help';
import EventSamples from './Samples';
import EventCategories from './Categories';
import EventValues from './Values';

const Event = ({ route }) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    setValue,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { descriptors: '', quality: undefined, notes: '' }
  });
  const [loading, setLoading] = React.useState(true);
  const [isSafeToReset, setIsSafeToReset] = React.useState(false);
  const [event, setEvent] = React.useState({});
  const [step, setStep] = React.useState(0);
  const [modalHelp, setModalHelp] = React.useState(false);
  const [categorySelected, setCategorySelected] = React.useState(null);
  const [sampleResults, setSampleResults] = React.useState({});
  const [sampleSelected, setSampleSelected] = React.useState(null);
  const [intensity, setIntensity] = React.useState(0);
  const [title, setTitle] = React.useState('Evento');
  const [, dispatch] = useCacaoContext();
  React.useEffect(() => {
    fetchEventInfo();
  }, []);
  React.useEffect(() => {
    if (isSubmitSuccessful || isSafeToReset) {
      reset({ descriptors: '', quality: undefined, notes: '', comments: '', points: undefined });
      setIsSafeToReset(false);
    }
  }, [isSubmitSuccessful, isSafeToReset]);
  const fetchEventInfo = async () => {
    try {
      const token = await getItem('token');
      const { info, results } = await fetchEvent(route.params.event, token);
      setEvent(info);
      setSampleResults(results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e.errorCode === 401) {
        dispatch({ type: NOTIFY_EXPIRED });
      } else {
        dispatch({
          type: NOTIFY_ERROR,
          value: {
            title: e.errorCode,
            message: e.errorMessage || e.response.data.message,
            btnText: 'Intentar de nuevo',
            onPress: () => {
              dispatch({ type: NOTIFY_CLEAN });
            }
          }
        });
      }
    }
  };
  const goBack = () => {
    dispatch({
      type: NOTIFY_WARNING,
      value: {
        title: '¿Está seguro de salir?',
        message: '',
        btnText: 'Salir',
        btnSecondText: 'Cancelar',
        onPress: () => {
          dispatch({ type: NOTIFY_CLEAN });
          navigation.navigate('Home');
        },
        onSecondPress: () => {
          dispatch({ type: NOTIFY_CLEAN });
        }
      }
    });
  };
  const handleBack = () => {
    if (step === 1) setSampleSelected(null);
    if (step >= 2) {
      setCategorySelected(null);
      setIsSafeToReset(true);
      setIntensity(0);
    }
    setStep(prevState => step >= 3 ? 1 : --prevState);
  };
  const onSubmit = async () => {
    try {
      if (step === 1) {
        await fetchEventInfo();
        dispatch({ type: NOTIFY_CLEAN });
        setStep(0);
        setCategorySelected(null);
        setSampleSelected(null);
        setIntensity(0);
      } else if (step === 0) {
        dispatch({ type: NOTIFY_CLEAN });
        await navigation.navigate('Home');
      } else {
        await fetchEventInfo();
        setStep(1);
        setCategorySelected(null);
        if (step === 2) {
          setIntensity(0);
        }
        dispatch({ type: NOTIFY_CLEAN });
      }
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
  React.useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  return (
    <>
      <SafeArea>
        <AppBar>
          <AppBar.Back onPress={goBack} />
          <AppBar.Title title={title} />
          <AppBar.Content>
            <IconButton
              _pressed={{
                bg: 'transparent'
              }}
              onPress={() => setModalHelp(true)}
              icon={<Ionicons name='help-circle' size={28} color={Colors.baseColor.greenPrimary} />}
            />
          </AppBar.Content>
        </AppBar>
        {
          loading
            ? <LoadingScreen />
            : (
              <>
                {step === 0 && (
                  <EventSamples
                    callback={onSubmit}
                    eventId={event._id}
                    leaderId={event.leader._id}
                    samples={event.samples}
                    setSampleSelected={setSampleSelected}
                    samplesCompleted={event.samplesCompleted}
                    setStep={setStep}
                    setTitle={setTitle}
                  />
                )}
                {step === 1 && (
                  <EventCategories
                    callback={onSubmit}
                    event={event}
                    handleBack={handleBack}
                    sampleSelected={sampleSelected}
                    sampleResults={sampleResults}
                    setCategorySelected={setCategorySelected}
                    setIntensity={setIntensity}
                    setStep={setStep}
                    setTitle={setTitle}
                    setValue={setValue}
                  />
                )}
                {step === 2 && (
                  <EventValues
                    callback={onSubmit}
                    categorySelected={categorySelected}
                    control={control}
                    errors={errors}
                    eventId={event._id}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    intensity={intensity}
                    sampleSelected={sampleSelected}
                    setIntensity={setIntensity}
                  />
                )}
                {step === 3 && (
                  <EventValues.Points
                    callback={onSubmit}
                    eventId={event._id}
                    handleBack={handleBack}
                    control={control}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    sampleSelected={sampleSelected}
                  />
                )}
                {step === 4 && (
                  <EventValues.Comments
                    callback={onSubmit}
                    eventId={event._id}
                    handleBack={handleBack}
                    control={control}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    sampleSelected={sampleSelected}
                  />
                )}
              </>
              )
        }
      </SafeArea>
      {modalHelp && (
        <ModalHelp closeModal={() => setModalHelp(false)} />
      )}
    </>
  );
};

export default Event;
