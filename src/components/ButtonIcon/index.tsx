import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Icon, ButtonIconType } from './styles';

interface ButtonIconProps extends TouchableOpacityProps {
  type?: ButtonIconType;
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: number;
}

export function ButtonIcon({ type = 'PRIMARY', icon, size = 24, ...rest }: ButtonIconProps) {
  return (
    <Container 
      {...rest}
    >
      <Icon name={icon} type={type} size={size}/>
    </Container>
  );
}
