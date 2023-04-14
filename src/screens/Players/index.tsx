import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

export function Players() {
  const route = useRoute();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const { group } = route.params as { group: string };

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New player', 'Please, enter a player name.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playersGetByGroup(group);
      console.log(players);

      Alert.alert(
        'New player',
        `Player ${newPlayer.name} added successfully on the team ${newPlayer.team}.`
      );

      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New player', error.message);
      } else {
        console.log(error);
        Alert.alert('New player', 'Something went wrong. Try again.');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="Add the peoples and separate the teams"
      />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Player Name"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" size={30} onPress={handleAddPlayer} />
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

      <Button title="Remove Team" type="SECONDARY" />
    </Container>
  );
}
