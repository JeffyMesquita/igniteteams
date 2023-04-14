import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles';

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container activeOpacity={.5} {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
