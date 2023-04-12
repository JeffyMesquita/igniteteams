import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    // 'Os Parças',
    // 'Conhecidos do Trabalho',
    // 'Amigos da Faculdade',
  ]);

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subTitle="Jogue com a sua galera" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
    </Container>
  );
}
