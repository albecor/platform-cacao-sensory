import React from 'react';
import { bool, array, shape, func } from 'prop-types';
import { Animated, FlatList, StyleSheet } from 'react-native';
import { Box, Divider, Pressable, Stack } from 'native-base';
import Text from '../../atoms/Text';
import Colors from '../../Theme/colors';
import Styles from './Accordion.styles';

const styles = StyleSheet.create(Styles);

const AccordionSubItem = ({ children }) => {
  const fadeAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const AccordionItem = ({ item, lastItem, selected, onPress }) => (
  <Pressable onPress={() => onPress(item.sampleId)}>
    <Box
      pl='4'
      pr='5'
      style={[
        styles.cardContainer,
        (selected ? styles.cardContainerOpen : styles.cardContainerClose),
        (lastItem.sampleId === item.sampleId) && styles.lastCard]}
    >
      <Stack p='4' space={3}>
        <Stack space={2}>
          <Text.Description color={Colors.shades.green[700]} marginBottom={0} text='Muestra' />
          <Text.Title color={Colors.shades.oxley[700]} marginBottom={0} text={item.sample} />
        </Stack>
        {selected && (
          <AccordionSubItem>
            <Divider my='2' thickness='2' />
            {item.data.map((property, index) => (
              <Stack p='2' space={2} key={index}>
                <Text
                  style={styles.bodyText}
                  text={`Proceso: ${property.state.label}`}
                />
                <Text
                  style={styles.bodyText}
                  text={`Fecha inicio: ${property.startAt}`}
                />
                <Text
                  style={styles.bodyText}
                  text={`Fecha fin: ${property.endAt}`}
                />
                {property.notes && (
                  <Text
                    style={styles.bodyText}
                    text={`Notas: ${property.notes}`}
                  />
                )}
              </Stack>
            ))}
          </AccordionSubItem>
        )}
      </Stack>
    </Box>
  </Pressable>
);
AccordionItem.propTypes = {
  item: shape({}),
  lastItem: shape({}),
  onPress: func,
  selected: bool
};

const Accordion = ({ dataArray }) => {
  const [index, setIndex] = React.useState(undefined);
  const lastItem = [...dataArray].pop();
  const onRowPress = sampleId => {
    setIndex(index === sampleId ? undefined : sampleId);
  };
  return (
    <FlatList
      data={dataArray}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, key }) => (
        <AccordionItem
          key={String(key)}
          item={item}
          lastItem={lastItem}
          onPress={onRowPress}
          selected={index === item.sampleId}
        />
      )}
    />
  );
};

Accordion.propTypes = {
  dataArray: array.isRequired
};

export default Accordion;
