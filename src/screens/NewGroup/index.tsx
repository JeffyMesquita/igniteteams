import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title="New Group"
          subTitle="Create a group to play with your friends"
        />

        <Button 
          title="Create Group"
        />
      </Content>
    </Container>
  );
}
