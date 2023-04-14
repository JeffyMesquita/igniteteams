import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, FlatList, TextInput, Keyboard } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Loading } from '@components/Loading';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

export function Players() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>(
    [] as PlayerStorageDTO[]
  );
  const newPlayerNameInputRef = useRef<TextInput>(null);

  const { group } = route.params as { group: string };
  const navigation = useNavigation();

  const handleAddPlayer = useCallback(async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New player', 'Please, enter a player name.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      Alert.alert(
        'New player',
        `Player ${newPlayer.name} added successfully on the team ${newPlayer.team}.`
      );

      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();
      setNewPlayerName('');
      fetchPlayersByTeam(team);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New player', error.message);
      } else {
        console.log(error);
        Alert.alert('New player', 'Something went wrong. Try again.');
      }
    }
  }, [newPlayerName, group, team, AppError]);

  const fetchPlayersByTeam = useCallback(
    async (selectedTeam: string) => {
      try {
        setIsLoading(true);
        const playersByTeam = await playersGetByGroupAndTeam(
          group,
          selectedTeam
        );
        setPlayers(playersByTeam);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Players',
          'Something went wrong, it was not possible to load the people of the selected team. Try again.'
        );
      }
    },
    [group, setIsLoading]
  );

  const handlePlayerRemove = useCallback(
    async (playerName: string) => {
      try {
        await playerRemoveByGroup(playerName, group);

        Alert.alert('Remove player', `The player ${playerName} was removed.`);
        await fetchPlayersByTeam(team);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Remove player',
          'Something went wrong, it was not possible to remove the player. Try again.'
        );
      }
    },
    [group, team]
  );

  const removeGroup = useCallback(async () => {
    try {
      await groupRemoveByName(group);

      Alert.alert('Remove group', `The group ${group} was removed.`);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Remove group',
        'Something went wrong, it was not possible to remove the group. Try again.'
      );
    }
  }, [group]);

  const handleGroupRemove = useCallback(async () => {
    Alert.alert(
      'Remove group',
      `Are you sure you want to remove the group '${group.toLocaleUpperCase()} '?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, remove',
          onPress: () => removeGroup(),
        },
      ]
    );
  }, [removeGroup]);

  useEffect(() => {
    fetchPlayersByTeam(team);
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
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handlePlayerRemove(item.name);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="There are no people in this team." />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remove Class"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
