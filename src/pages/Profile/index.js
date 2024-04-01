import {
  Avatar, Box,
  Center,
  Circle,
  VStack
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCacaoContext } from '../../context';
import {
  USER_LOGIN_OUT
} from '../../context/types';
import AppBar from '../../patterns/atoms/AppBar';
import SafeArea from '../../patterns/atoms/SafeArea';
import BSText from '../../patterns/atoms/Text';
import Card from '../../patterns/molecules/Card';
import Modal from '../../patterns/molecules/Modal';
import { Colors } from '../../patterns/Theme';
import { deleteItem } from '../../utils/Keychain';
import EditProfile from './edit';
import ModifyPassword from './modifyPassword';
import Styles from './profile.styles';
import defaultImage from '../../assets/images/profile.png';

const styles = StyleSheet.create(Styles);

const Profile = () => {
  const [controller, dispatch] = useCacaoContext();
  const [profile, setProfile] = useState(controller.user);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const handleDismiss = data => {
    if (data) setProfile(prevState => ({ ...prevState, ...data }));
    setModalProfile(false);
  };
  const handleLogout = async () => {
    await deleteItem('token');
    dispatch({ type: USER_LOGIN_OUT });
  };
  return (
    <>
      <SafeArea>
        <AppBar>
          <AppBar.Title title='' />
          <AppBar.Title title='Mi perfil' />
          <AppBar.Title title='' />
        </AppBar>
        <Box mt={3} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <VStack space={4} alignItems='center'>
              <Circle size={120} bg={Colors.baseColor.greenSecondary}>
                <Circle size={108} bg={Colors.baseColor.redPrimary}>
                  <Avatar
                    bg={Colors.baseColor.redPrimary}
                    source={defaultImage}
                    size='xl'
                  />
                </Circle>
              </Circle>
              <Center>
                <BSText.Title
                  color={Colors.baseColor.redPrimary}
                  text={`Hola, ${profile.name}`}
                />
              </Center>
            </VStack>
            <Box pt={20} style={styles.container}>
              <View style={styles.containerItem}>
                <Card title='Editar perfil' onPress={() => setModalProfile(true)} />
              </View>
              <View style={styles.containerItem}>
                <Card onPress={() => setModalPassword(true)} title='Cambiar contraseña' />
              </View>
              <View style={styles.containerItem}>
                <Card onPress={() => setModalLogout(true)} title='Cerrar sesión' />
              </View>
            </Box>
            <Box h={20} />
          </ScrollView>
        </Box>
      </SafeArea>
      {modalProfile && (
        <EditProfile
          data={profile}
          handleDismiss={handleDismiss}
        />
      )}
      {modalPassword && (
        <ModifyPassword handleDismiss={() => setModalPassword(false)} />
      )}
      {modalLogout && (
        <Modal
          actions={[
            { label: 'No', onPress: () => setModalLogout(false) },
            { label: 'Si', onPress: handleLogout }
          ]}
          closeButton={false}
          handleDismiss={() => setModalLogout(false)}
          message='¿Está seguro de cerrar sesión?'
        />
      )}
    </>
  );
};

export default Profile;
