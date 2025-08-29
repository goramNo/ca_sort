import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
import { FRIENDS } from '../../shared/data/friends';
import { MOOD_EMOJI, Mood } from '../../shared/types/mood';

type Props = NativeStackScreenProps<RootStackParamList, 'Proposer'>;

export default function ProposerScreen({ route, navigation }: Props) {
  const mood: Mood | undefined = route.params?.mood;
  const [text, setText] = useState('');

  const tagged = useMemo(
    () => FRIENDS.filter((f) => f.mood === mood).map((f) => f.name),
    [mood]
  );

  const onCreate = () => {
    // Simulation pour le MVP mock. À remplacer par un push Firestore plus tard.
    console.log('Proposition:', { mood, text, tagged });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
        Proposer une sortie {mood ? `(${MOOD_EMOJI[mood]})` : ''}
      </Text>

      <TextInput
        placeholder="Ex: Tacos 20h Argenteuil / Valorant 21h"
        placeholderTextColor="#888"
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: '#121214',
          color: '#fff',
          padding: 12,
          borderRadius: 12,
        }}
      />

      <Text style={{ color: '#9aa' }}>
        Amis tagués (même mood) : {tagged.length ? tagged.join(', ') : 'aucun'}
      </Text>

      <Pressable
        onPress={onCreate}
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 14,
          alignItems: 'center',
          marginTop: 'auto',
        }}
      >
        <Text style={{ fontWeight: '700' }}>Proposer</Text>
      </Pressable>
    </View>
  );
}
