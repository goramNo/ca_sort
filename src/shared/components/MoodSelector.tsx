import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Mood, MOOD_EMOJI } from '../types/mood';

export default function MoodSelector({
  selected, onSelect,
}: { selected?: Mood; onSelect: (m: Mood) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {(Object.keys(MOOD_EMOJI) as Mood[]).map((m) => {
        const isSel = selected === m;
        return (
          <Pressable
            key={m}
            onPress={() => onSelect(m)}
            style={{
              borderWidth: 2,
              borderColor: isSel ? '#fff' : '#777',
              borderRadius: 16,
              paddingVertical: 10,
              paddingHorizontal: 14,
              marginRight: 8,
              marginBottom: 8,
            }}
            android_ripple={{ color: '#333', radius: 28 }}
          >
            <Text style={{ fontSize: isSel ? 32 : 28 }}>{MOOD_EMOJI[m]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
