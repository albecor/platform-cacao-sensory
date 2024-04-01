import React from 'react';
import { bool, func, shape } from 'prop-types';
import {
  Animated,
  FlatList,
  Linking,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import ModalForm from '../../patterns/molecules/Modal/ModalForm';
import BSText from '../../patterns/atoms/Text';
import Styles from '../../patterns/molecules/Accordion/Accordion.styles';
import { Box, Divider, Pressable, Stack } from 'native-base';
import Colors from '../../patterns/Theme/colors';
import RenderHtml from 'react-native-render-html';

const styles = StyleSheet.create(Styles);

const HelpSubItem = ({ children }) => {
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

const HelpItem = ({ item, lastItem, selected, onPress }) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Box
        pl='4'
        pr='5'
        style={[
          styles.cardContainer,
          (selected ? styles.cardContainerOpen : styles.helpContainerClose),
          (lastItem.id === item.id) && styles.lastCard]}
      >
        <Stack p='4' space={3}>
          <BSText.Description color={Colors.shades.green[700]} marginBottom={0} text={item.title} />
          {selected && (
            <HelpSubItem>
              <Divider my='2' thickness='2' />
              <Box p='2'>
                <RenderHtml
                  contentWidth={width}
                  source={{ html: item.content }}
                />
              </Box>
            </HelpSubItem>
          )}
        </Stack>
      </Box>
    </Pressable>
  );
};
HelpItem.propTypes = {
  item: shape({}),
  lastItem: shape({}),
  onPress: func,
  selected: bool
};

const dataArray = [
  {
    id: 0,
    title: 'Etapas de Análisis Sensorial',
    content: '<ol>' +
      '<li style="text-align: justify">Observar la apariencia de la muestra: color, brillo, etc. El catador puede anotar estas observaciones en Comentarios.</li>' +
      '<li style="text-align: justify">Oler la muestra para evaluar la categoría de Aroma. Se recomienda utilizar un envase limpio y libre de olores para colocar la muestra durante esta parte de la evaluaci&oacute;n.</li>' +
      '<li style="text-align: justify">Degustar la muestra para evaluar las categorías de Acidez, Amargor, Astringencia, Defectos y Sabores. Si la muestra est&aacute; s&oacute;lida, se recomienda masticarla suavemente y dejarla derretir lentamente en el paladar. Es posible que el catador tendr&aacute; que repetir el proceso de degustaci&oacute;n varias veces para identificar y captar toda la informaci&oacute;n necesaria para completar el an&aacute;lisis.</li>' +
      '<li style="text-align: justify">Cuando la muestra ha sido degustado completamente y/o ha sido escupido, el catador analiza los sabores residuales en la boca para la categor&iacute;a de Pos Gusto.</li>' +
      '</ol>'
  },
  {
    id: 1,
    title: 'Intensidad',
    content: 'Valorar la intensidad de los atributos percibidos en una escala de 0 (ausente) a 5 (extremo) en la cual se permite el uso de medios puntos.\n\n' +
      '<p><strong>Escala de intensidad:</strong></p>' +
      '<p style="padding-left: 40px;">0 = Ausente, sin presencia de este atributo.</p>' +
      '<p style="padding-left: 40px;">1 = Apenas detectable, d&eacute;bil su presencia.</p>' +
      '<p style="padding-left: 40px;">2 = Presente, se percibe claramente.</p>' +
      '<p style="padding-left: 40px;">3 = Caracteriza la muestra, una caracter&iacute;stica resaltante.</p>' +
      '<p style="padding-left: 40px;">4 = Dominante, produce dificultad en percibir otras caracter&iacute;sticas de la muestra.</p>' +
      '<p style="padding-left: 40px;">5 = Extremo, la presentaci&oacute;n de este atributos es la m&aacute;s intensa posible para cacao en la memoria sensorial del catador.</p>'
  },
  { id: 2, title: 'Descriptores', content: '<p style="padding-top: 0; margin-top: 0; text-align: justify">Se valora num&eacute;ricamente la calidad de cada categor&iacute;a, usando la escala de calidad 0 (p&eacute;simo) a 10 (excelente). Tambi&eacute;n se permite el uso de medio puntos en esta escala.</p>' },
  {
    id: 3,
    title: 'Calidad',
    content: '<p>Se valora numéricamente la calidad de cada categoría, usando la escala de calidad de 0 (pésimo) a 10 (excelente). También se permite el uso de medio puntos en esta escala.</p>' +
      '<p><strong>Escala de calidad: </strong></p>' +
      '<p style="padding-left: 10px;">PÉSIMO = Aproximadamente entre 0-2</p>' +
      '<p style="padding-left: 10px;">MALO = Aproximadamente entre 2-4</p>' +
      '<p style="padding-left: 10px;">REGULAR = Aproximadamente entre 4-6</p>' +
      '<p style="padding-left: 10px;">BUENO = Aproximadamente entre 6-8</p>' +
      '<p style="padding-left: 10px;">EXCELENTE = Aproximadamente entre 8-10</p>'
  },
  {
    id: 4,
    title: 'Evaluar calidad en Defectos',
    content: '<p style="padding-top: 0; margin-top: 0; text-align: justify">Para evaluar la intensidad en defectos, uno debe tomar en cuenta la intensidad total de todos los defectos identificados. Sugerimos que el catador debe nombrar explícitamente el defecto que él o ella encuentra para evitar un descuento de puntos en calidad sin justificarlo. Para evaluar calidad en defectos, se debe tomar en consideración la relación inversa en defectos en cuanto a calidad: entre más intenso el sabor defectuoso, o los sabores defectuosos, su puntales en calidad sería más bajo.</p>'
  },
  {
    id: 5,
    title: 'Aroma',
    content: '<p><strong>Concepto:</strong> Una percepción sensorial basada en los sentidos del órgano olfativo.</p>' +
      '<p><strong>Pasos para analizar el Aroma:</strong></p>' +
      '<ol>' +
      '<li>El catador tomará el envase que contiene la muestra y la llevará a la altura de la nariz, inhalará profundamente tratando de percibir la mayor cantidad de olores que emerjan de la muestra.</li>' +
      '<li>Calificar la intensidad de los olores, tomando en cuenta que la intensidad no determina la calidad. La intensidad varia bastante en base de la catación de una muestra sólida versus líquida, pero la calidad no debe cambiar en base de ese factor.</li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Aroma; si no pudo percibir claramente la muestra, podrá repetir la acción.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por uno para el puntaje. El puntaje máximo en Aroma: 10 puntos.</li>' +
      '</ol>'
  },
  {
    id: 6,
    title: 'Acidez',
    content: '<p><strong>Concepto:</strong> Es la propiedad organoléptica de sustancias puras o de mezclas cuya degustación produce un sabor ácido. Acido es el sabor elemental provocado por soluciones acuosas diluidas de sustancias ácidas, tales como el ácido citríco o el ácido tartárico.</p>' +
      '<p><strong>Pasos para analizar el Acidez:</strong></p>' +
      '<ol>' +
      '<li>Durante la degustación de la muestra, Durante la degustación de la muestra, calificar la intensidad de la acidez o la combinación de ácidos percibidos, tomando en cuenta que la intensidad no determina la calidad. La relación entre intensidad y calidad varía dependiendo de la percepción y descripción de los ácidos encontrados durante la degustación de la muestra. Por ejemplo, ácido cítrico, acético, láctico, butírico, tartárico, málico, carbónico, fosfórico, etc.</li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Acidez.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por uno para el puntaje. El puntaje máximo en Acidez: 10 puntos.</li>' +
      '</ol>' +
      '<p><strong>Referencias de ácidos:</strong></p>' +
      '<p style="padding-left: 30px;">Ácido cítrico = Limón, naranja, mandarina, toronja.</p>' +
      '<p style="padding-left: 30px;">Ácido málico = Manzana.</p>' +
      '<p style="padding-left: 30px;">Ácido tartárico = Uvas, tamarindo.</p>' +
      '<p style="padding-left: 30px;">Ácido acético =Vinagre, agrio.</p>' +
      '<p style="padding-left: 30px;">Ácido láctico = Leche cortas, yogurt.</p>' +
      '<p style="padding-left: 30px;">Ácido butírico = Mantequilla rancia, o en alimentos grasos en general, vomito.</p>' +
      '<p style="padding-left: 30px;">Ácido nítrico = Carne pútrida.</p>'
  },
  {
    id: 7,
    title: 'Amargor',
    content: '<p><strong>Concepto:</strong> Propiedad organoléptica de los compuestos puros o de mezclas cuya degustación provoca el sabor amargo. Amargo es el sabor elemental provocado por las soluciones acuosas diluidas de diversas sustancias, tales como la quinina o la cafeína.</p>' +
      '<p><strong>Pasos para analizar el Amargor:</strong></p>' +
      '<ol>' +
      '<li>Durante la degustación de la muestra, calificar la intensidad del amargor, tomando en cuenta que la intensidad puede influir en la calidad, y frecuentemente hay una relación inversa. Pueden referir a la pequeña leyenda al lado de los nombres de las categorías Amargor y Astringencia.' +
      '<ol style="list-style-type: lower-alpha;">' +
      '<li>Si el catador está analizando una muestra y encuentra un nivel de amargor entre Ausente con una intensidad de 0 hasta Presente con una intensidad de 2/2.5, puede dar una valoración en calidad de Regular, Bueno o Excelente.</li>' +
      '<li>Si el catador está analizando una muestra, y encuentra un nivel de amargor que Caracteriza la Muestra con una intensidad de 2.5/3 hasta Extremo con una intensidad de 5, puede dar una valoración en calidad de Regular, Malo, o Pésimo.</li>' +
      '</ol></li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Amargor.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por uno para el puntaje. El puntaje máximo en Amargor: 10 puntos.</li>' +
      '</ol>' +
      '<p><strong>Nota:</strong> La relación entre intensidad y calidad es inversa, entre más alta la intensidad, la calidad suele ser más baja.</p>'
  },
  {
    id: 8,
    title: 'Astringencia',
    content: '<p><strong>Concepto:</strong> Astringencia se refiere a la sensación de fruncimiento o sequedad creada en la boca y garganta. Un fuerte sabor astringente...puede dejar una sensación de aspereza en la boca. Una cantidad baja a moderada de astringencia puede tener una sensación más sutil, o "resbaladiza".</p>' +
      '<p><strong>Pasos para analizar la Astringencia:</strong></p>' +
      '<ol>' +
      '<li>Durante la degustación de la muestra, calificar la intensidad de la astringencia, tomando en cuenta que la intensidad puede influir en la calidad, y frecuentemente hay una relación inversa. Pueden referir a la pequeña leyenda al lado de los nombres de las categorías Amargor y Astringencia.' +
      '<ol style="list-style-type: lower-alpha;">' +
      '<li>Si el catador una muestra y encuentra un nivel de astringencia entre Ausente con una intensidad de 0 hasta Presente con una intensidad de 2/2.5, puede dar una valoración en calidad de Regular, Bueno o Excelente.</li>' +
      '<li>Si el catador está analizando un una muestra, y encuentra un nivel de astringencia que Caracteriza la Muestra con una intensidad de 2.5/3 hasta Extremo con una intensidad de 5, puede dar una valoración en calidad de Regular, Malo, o Pésimo.</li>' +
      '</ol></li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Astringencia.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por uno para el puntaje. El puntaje máximo en Astringencia: 10 puntos.</li>' +
      '</ol>' +
      '<p><strong>Nota:</strong> La relación entre intensidad y calidad es inversa, entre más alta la intensidad, la calidad suele ser más baja.</p>'
  },
  {
    id: 9,
    title: 'Defectos',
    content: '<p><strong>Concepto:</strong> Se define por presencia de sabores defectuosos no característicos del cacao, asociado generalmente a un deterioro o transformación de un producto.</p>' +
      '<p><strong>Pasos para analizar Defectos:</strong></p>' +
      '<ol>' +
      '<li>Durante la degustación de la muestra, calificar la intensidad del defecto o la combinación de defectos percibidos, tomando en cuenta que una mayor intensidad de defectos indica un menor puntaje en calidad.</li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Defectos. El catador debe nombrar el defecto específico si reduce el puntaje de calidad. Si la muestra está limpia o libre de defectos, se califica como Excelente en calidad.</li>' +
      '<li>Recuerda que sabores o texturas relacionados al procesamiento de la muestra durante su tostado o molienda no son Defectos en este caso. Se recomienda anotar estas observaciones en Comentarios y sugerir una repetición de preparación de la muestra con nuevos parámetros.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por DOS para el puntaje. El puntaje máximo en Defectos: 20 puntos.</li>' +
      '</ol>'
  },
  {
    id: 10,
    title: 'Sabor',
    content: '<p><strong>Concepto:</strong> Es la impresión que causa un alimento u otra sustancia, y está determinado principalmente por sensaciones químicas detectadas por el gusto (lengua) así como por el olfato (olor).</p>' +
      '<p><strong>Pasos para analizar el Sabor:</strong></p>' +
      '<ol>' +
      '<li>Durante la degustación de la muestra, calificar la intensidad de los sabores positivos o neutros percibidos, tomando en cuenta que sabores negativos se evalúan principalmente en Defectos. La relación entre intensidad y calidad varía dependiendo de la percepción y descripción de los sabores encontrados durante la degustación de la muestra.</li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Sabor. No siempre se encuentra todas las categorías de sabor en una muestra, sólo describa lo que percibes.</li>' +
      '<li>La calidad se basa en una combinación de factores: armonía, claridad, complejidad.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por DOS para el puntaje. El puntaje máximo en Sabor: 20 puntos.</li>' +
      '</ol>' +
      '<p><strong>Referencias de sabor:</strong></p>' +
      '<p style="padding-left: 30px;">Cocoa/Cacao = Chocolate, fudge, brownie, polvo de cacao, nibs.</p>' +
      '<p style="padding-left: 30px;">Dulce = Caramelo, miel, panela, malta, melaza, azúcar moreno.</p>' +
      '<p style="padding-left: 30px;">Nueces = Maní, almendra, pecanas, pistacho</p>' +
      '<p style="padding-left: 30px;">Frutas frescas = Manzana, plátano, melón, piña, cereza, uvas.</p>' +
      '<p style="padding-left: 30px;">Frutos secos = Uvas pasas, ciruelas pasas, higo seco, cereza seca, durazno seco.</p>' +
      '<p style="padding-left: 30px;">Flores = Rosas, jazmín, flor de café.</p>' +
      '<p style="padding-left: 30px;">Especias = Canela, clavo de olor, albahaca, orégano, laurel</p>'
  },
  {
    id: 11,
    title: 'Pos Gusto',
    content: '<p><strong>Concepto:</strong> Los sabores residuales en el paladar después de degustar la muestra.</p>' +
      '<p><strong>Pasos para analizar el Pos Gusto:</strong></p>' +
      '<ol>' +
      '<li>Cuando la muestra ha sido degustado completamente y/o ha sido escupido, el catador analiza los sabores residuales en la boca.</li>' +
      '<li>Calificar la intensidad del pos gusto, tomando en cuenta que la intensidad no determina la calidad.</li>' +
      '<li>Anotar los descriptores, describiendo lo percibido en Pos gusto.</li>' +
      '<li>Calificar la calidad, utilizando las escalas como una guía, y multiplica por uno para el puntaje. El puntaje máximo en Pos gusto: 10 puntos.</li>' +
      '</ol>'
  },
  {
    id: 12,
    title: 'Puntaje del catador',
    content: '<p><strong>Concepto:</strong> En esta sección el catador hace una valoración de la apreciación global\n' +
      'y subjetiva de la muestra, teniendo en cuenta todas las categorías de\n' +
      'evaluación. En esta categoría el catador puede calificar en base de su\n' +
      'apreciación personal y profesional de la calidad de la muestra.</p>'
  },
  {
    id: 13,
    title: 'Comentarios',
    content: '<p><strong>Pasos para comentarios:</strong></p>' +
      '<ol>' +
      '<li>Este espacio es para observaciones no incluidos en otros lugares (por ejemplo: apariencia, textura).</li>' +
      '<li>El catador o la catadora puede usar Comentarios para preparar un resumen de la evaluación y recomendaciones.</li>' +
      '<li>El catador o la catadora puede anotar cualquier factor adicional que ha influido en el análisis sensorial, como condiciones ambientales y procesamiento de la muestra.</li>' +
      '</ol>'
  }
];

const ModalHelp = ({ closeModal }) => {
  const [index, setIndex] = React.useState(null);
  const lastItem = [...dataArray].pop();
  const onRowPress = id => {
    setIndex(index === id ? undefined : id);
  };
  return (
    <ModalForm onRequestClose={closeModal}>
      <ModalForm.Header
        handleDismiss={closeModal}
      />
      <ModalForm.Body customStyleBody={styles.helpBody}>
        <Box pb={2}>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <BSText.Title text='Ayuda' />
                <BSText.Description text='Información extraída de:' />
                <BSText.Link
                  onPress={() =>
                    Linking.openURL('https://equalexchange.coop/usaid-cooperative-development-program')}
                  text='https://equalexchange.coop/usaid-cooperative-development-program'
                />
              </>
            )}
            data={dataArray}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, key }) => (
              <HelpItem
                key={String(key)}
                item={item}
                lastItem={lastItem}
                onPress={onRowPress}
                selected={index === item.id}
              />
            )}
          />
        </Box>
      </ModalForm.Body>
    </ModalForm>
  );
};

ModalHelp.propTypes = {
  closeModal: func
};

export default ModalHelp;
