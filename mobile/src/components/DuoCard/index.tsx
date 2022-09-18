import { TouchableOpacity, View, Text } from 'react-native';
import {GameController} from 'phosphor-react-native'
import { THEME } from '../../theme';
import { DouInfo } from '../DouInfo';

import { styles } from './styles';

 export interface DuoCardProps{
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  userVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}


interface Props {
  data:DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DouInfo 
        label='Nome'
        value='José'
      />
      <DouInfo 
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <DouInfo 
        label='Disponibilidade' 
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DouInfo 
        label='Chamada de áudio?'
        value={data.userVoiceChannel? "Sim" : "Não"}
        colorValue={data.userVoiceChannel? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
      />

      <TouchableOpacity
        style={styles.button}
        onPress = {onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}