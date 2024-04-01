import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Box } from 'native-base';
import { fetchHistory } from '../../api';
import { useCacaoContext } from '../../context';
import { NOTIFY_CLEAN, NOTIFY_ERROR, NOTIFY_EXPIRED } from '../../context/types';
import AppBar from '../../patterns/atoms/AppBar';
import SafeArea from '../../patterns/atoms/SafeArea';
import Accordion from '../../patterns/molecules/Accordion';
import SkeletonHistory
from '../../patterns/molecules/Skeleton/Skeleton.history';
import { getItem } from '../../utils/Keychain';

const History = () => {
  const [, dispatch] = useCacaoContext();
  const [loading, setLoading] = React.useState(true);
  const [process, setProcess] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const token = await getItem('token');
      const data = await fetchHistory(token);
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

  return (
    <SafeArea>
      <AppBar>
        <AppBar.Title title='' />
        <AppBar.Title title='Historial de procesos' />
        <AppBar.Title title='' />
      </AppBar>
      <Box mt={3}>
        {loading
          ? <SkeletonHistory />
          : <Accordion dataArray={process} />}
      </Box>
    </SafeArea>

  );
};

export default History;
