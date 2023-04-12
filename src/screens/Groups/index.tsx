import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  return (
    <Container>
      <Header />

      <Highlight 
        title="Turmas"
        subTitle="Jogue com a sua galera"
      />

      <GroupCard 
        title='Os Parças'
      />
    </Container>
  );
}
