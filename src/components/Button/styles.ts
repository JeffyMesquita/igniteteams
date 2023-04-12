import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export type ButtonType = 'PRIMARY' | 'SECONDARY';

interface ButtonTypeStyleProps {
  type: ButtonType;
}

export const Container = styled(TouchableOpacity)<ButtonTypeStyleProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;