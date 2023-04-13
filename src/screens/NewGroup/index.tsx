import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  function handleNew() {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New Group"
          subTitle="Create a group to play with your friends"
        />

        <Input placeholder="Group name" onChangeText={setGroup} />

        <Button
          title="Create Group"
          style={{
            marginTop: 20,
          }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
