import { Container, Form } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Group Name"
        subTitle="Add the peoples and separate the teams"
      />

      <Form>
        <Input placeholder="Player Name" autoCorrect={false} />
        <ButtonIcon icon="add" size={30} />
      </Form>
    </Container>
  );
}
