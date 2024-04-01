import React from 'react';
import { ImageBackground, StyleSheet, ScrollView, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Box, Center, Stack, StatusBar, VStack } from 'native-base';
import { fetchEvents, processActived, updateEvent, updateSample } from '../../api';
import { useCacaoContext } from '../../context';
import { NOTIFY_CLEAN, NOTIFY_ERROR, NOTIFY_EXPIRED, NOTIFY_LOADER } from '../../context/types';
import SafeArea from '../../patterns/atoms/SafeArea';
import BSText from '../../patterns/atoms/Text';
import Card from '../../patterns/molecules/Card';
import SkeletonHistory from '../../patterns/molecules/Skeleton/Skeleton.history';
import { Colors } from '../../patterns/Theme';
import { formatDate, getTimeName } from '../../utils';
import { getItem } from '../../utils/Keychain';
import bckImage from '../../assets/images/bck.png';
import Styles from './Home.styles';

const styles = StyleSheet.create(Styles);

const Home = () => {
  const [controller, dispatch] = useCacaoContext();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [process, setProcess] = React.useState([]);
  const [nextEvents, setNextEvents] = React.useState([]);
  const [currentEvent, setCurrentEvent] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const token = await getItem('token');
      const data = await processActived(token);
      const eventsList = await fetchEvents(token);
      setNextEvents(eventsList.filter(e => !e.activated && e.endAt === null));
      setCurrentEvent(eventsList.find(e => e.activated));
      setProcess(data);
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

  const showBtn = ({
    leader,
    startAt
  }) => {
    const today = new Date();
    const startDate = new Date(startAt);
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    return (
      leader._id === controller.user._id &&
      todayYear >= startYear &&
      todayMonth >= startMonth &&
      todayDay >= startDay
    );
  };

  const handleEvent = async (event) => {
    try {
      if (!event.activated) {
        dispatch({ type: NOTIFY_LOADER });
        const token = await getItem('token');
        await updateEvent(event._id, { activated: true }, token);
        await updateSample({
          event: event._id,
          state: controller.states.find(s => s.order === 7)._id,
          owner: controller.user._id
        },
        token);
        dispatch({ type: NOTIFY_CLEAN });
      }
      await navigation.navigate('Event', {
        event: event._id
      });
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

  return (
    <SafeArea>
      <StatusBar backgroundColor={Colors.baseColor.greenCoffee} barStyle='light-content' />
      <ScrollView style={styles.scroll}>
        <ImageBackground source={bckImage} style={styles.imageBackground} />
        {loading
          ? (
            <Box mt={3}><SkeletonHistory /></Box>
            )
          : (
            <Stack>
              <VStack style={styles.layout}>
                <View style={styles.container}>
                  <View style={styles.innerContainer}>
                    <Center my={5}>
                      <BSText text={getTimeName()} style={styles.greetings} />
                    </Center>
                    {currentEvent && (
                      <>
                        <BSText.Title text='Evento en marcha' />
                        <Card
                          size={{
                            w: '100%',
                            h: '120'
                          }}
                          customStyles={styles.eventCard}
                          title={`Líder del evento: ${currentEvent.leader?.name}`}
                          text={`Muestras: ${currentEvent.samples}`}
                        >
                          <Box flexDirection='row-reverse'>
                            <BSText.Link
                              color={Colors.baseColor.greenCoffee}
                              onPress={() => navigation.navigate('Event', {
                                event: currentEvent._id
                              })}
                              text='Ingresar'
                            />
                          </Box>
                        </Card>
                      </>
                    )}
                    {nextEvents.length > 0
                      ? (
                        <>
                          <BSText.Title text='Próximos eventos' />
                          <VStack space={4} pt={5}>
                            {
                              nextEvents.map((e, i) => (
                                <Card
                                  key={i}
                                  size={{
                                    w: '100%',
                                    h: '120'
                                  }}
                                  customStyles={styles.eventCard}
                                  title={`Fecha del evento: ${formatDate(e.startAt)}`}
                                  text={`Muestras: ${e.samples}`}
                                >
                                  {showBtn(e) && (
                                    <Box flexDirection='row-reverse'>
                                      <BSText.Link
                                        color={Colors.baseColor.greenCoffee}
                                        onPress={() => handleEvent(e)}
                                        text='Iniciar evento'
                                      />
                                    </Box>
                                  )}
                                </Card>
                              ))
                            }
                          </VStack>
                        </>
                        )
                      : (
                        <Center>
                          <BSText.Title text='No hay eventos nuevos' />
                        </Center>
                        )}
                    {process.length > 0
                      ? (
                        <>
                          <BSText.Title text='Procesos' />
                          <VStack space={4} pt={5}>
                            {
                              process.map(item => (
                                <Card
                                  key={item._id}
                                  onPress={
                                    () => {
                                      navigation.navigate('Process', {
                                        process: item
                                      });
                                    }
                                  }
                                  text={`Proceso: Para ${item.state.label}`}
                                  title={`Muestra: ${item.sample}`}
                                />
                              ))
                            }
                          </VStack>
                        </>
                        )
                      : (
                        <Center>
                          <BSText.Title text='No hay procesos nuevos' />
                        </Center>
                        )}
                  </View>
                </View>
              </VStack>
            </Stack>
            )}
      </ScrollView>
    </SafeArea>
  );
};

export default Home;
