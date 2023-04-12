import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonText, ButtonType } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonType;
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <Container type={type} {...rest} activeOpacity={0.7}>
      <ButtonText>{title}</ButtonText>
    </Container>
  );
}
