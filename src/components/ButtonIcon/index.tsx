import { TouchableOpacityProps } from "react-native";

import { Container, Icon, ButtonIconType } from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
  type?: ButtonIconType;
}

export function ButtonIcon({ type = 'PRIMARY' }: ButtonIconProps) {
  return (
    <Container>
      <Icon type={type} name="home" />
    </Container>
  );
}