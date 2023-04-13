import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([
    // 'Anyone',
    // 'Doe',
    // 'John',
    // 'Mary',
    // 'David',
    // 'Tom',
    // 'Ricardo',
    // 'Maria',
    // 'João',
    // 'José',
  ]);

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

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remove Team"
        type='SECONDARY'
      />
    </Container>
  );
}
