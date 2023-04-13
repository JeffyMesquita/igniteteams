import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

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

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C', 'Team D']}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Filter
              isActive={item === team}
              title={item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
    </Container>
  );
}
