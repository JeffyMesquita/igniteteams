import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export type ButtonIconType = 'PRIMARY' | 'SECONDARY';

interface ButtonIconStyleProps {
  type: ButtonIconType;
  size?: number;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconStyleProps>(
  ({ theme, type, size }) => ({
    size,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  })
)``;
