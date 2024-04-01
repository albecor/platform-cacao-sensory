import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchSamplesStates, getProfile, validToken } from '../../api';
import { useCacaoContext } from '../../context';
import { STATES, USER, USER_LOGIN_IN, USER_LOGIN_OUT } from '../../context/types';
import RootNavigator from '../../navigators';
import AppBar from '../../patterns/atoms/AppBar';
import Login from '../../pages/auth/Login';
import Recover from '../../pages/auth/Recover';
import LoadingScreen from '../../patterns/molecules/LoadingScreen';
import { deleteItem, getItem } from '../Keychain';
import { VIEWER } from './roles';

const Stack = createStackNavigator();
const Authorization = () => {
  const [controller, dispatch] = useCacaoContext();
  const [loading, setLoading] = useState(false);
  const isAuthorized = controller.role === VIEWER;
  useEffect(() => {
    (async () => {
      try {
        const token = await getItem('token');
        if (token) {
          await validToken(token);
          const { data } = await getProfile(token);
          const states = await fetchSamplesStates(token);
          dispatch({ type: USER, value: data });
          dispatch({ type: STATES, value: states });
          dispatch({ type: USER_LOGIN_IN });
          setLoading(false);
        } else {
          dispatch({ type: USER_LOGIN_OUT });
          setLoading(false);
        }
      } catch (e) {
        await deleteItem('token');
        dispatch({ type: USER_LOGIN_OUT });
        setLoading(false);
      }
    })();
  }, []);
  if (loading) { return <LoadingScreen />; }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthorized
          ? <Stack.Screen name='Home' component={RootNavigator} options={{ headerShown: false }} />
          : (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen
                name='Recover' component={Recover} options={{
                  header: () => (
                    <AppBar>
                      <AppBar.Back route='Login' />
                    </AppBar>
                  )
                }}
              />
            </>
            )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Authorization;
