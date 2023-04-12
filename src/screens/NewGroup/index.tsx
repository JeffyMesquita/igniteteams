import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

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

        <Input 
          placeholder="Group name"
        />

        <Button 
          title="Create Group"
          style={{
            marginTop: 20,
          }}
        />
      </Content>
    </Container>
  );
}
