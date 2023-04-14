import { Alert } from 'react-native';
import { groupCreate } from '@storage/group/groupCreate';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { AppError } from '@utils/AppError';

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return  Alert.alert('New Group','Group name is required');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Group', error.message);
        return;
      }

      Alert.alert('New Group', 'An error occurred, try again later');
      console.log(error);
    }
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
