import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
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
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

export function Players() {
  const route = useRoute();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>(
    [] as PlayerStorageDTO[]
  );

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
      fetchPlayersByTeam();

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

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Players',
        'Something went wrong, it was not possible to load the people of the selected team. Try again.'
      );
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

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
          data={['Team A', 'Team B']}
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
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
