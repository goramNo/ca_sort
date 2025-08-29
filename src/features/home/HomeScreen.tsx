import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Mood, MOOD_EMOJI, MOOD_LABEL } from '../../shared/types/mood';
import { FRIENDS } from '../../shared/data/friends';

export default function HomeScreen() {
  const [mood, setMood] = useState<Mood | undefined>();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // amis filtrés par mood choisi
  const sameMoodFriends = FRIENDS.filter((f) => f.mood === mood);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0b0b0c' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 12 }}>
        Ce soir je suis :
      </Text>

      {/* Carrousel horizontal des moods */}
      <FlatList
        horizontal
        data={Object.keys(MOOD_EMOJI) as Mood[]}
        keyExtractor={(m) => m}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSel = mood === item;
          return (
            <Pressable
              onPress={() => setMood(item)}
              style={{
                borderWidth: 2,
                borderColor: isSel ? '#fff' : '#555',
                borderRadius: 12,
                padding: 20,
                marginRight: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: isSel ? 36 : 28 }}>{MOOD_EMOJI[item]}</Text>
              <Text style={{ color: '#aaa', marginTop: 6, fontSize: 12 }}>
                {MOOD_LABEL[item]}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Sélecteur d’heure */}
      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Pressable
          onPress={() => setShowPicker(true)}
          style={{
            backgroundColor: '#222',
            padding: 16,
            borderRadius: 12,
            width: '70%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 22 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(e, selected) => {
              setShowPicker(false);
              if (selected) setTime(selected);
            }}
          />
        )}
      </View>

      {/* Bouton valider */}
      <Pressable
        onPress={() => console.log('Valider', { mood, time })}
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 14,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: '700', color: '#000' }}>Valider</Text>
      </Pressable>

      {/* Liste des amis */}
      <Text style={{ color: '#9aa', fontSize: 18, marginBottom: 10 }}>Vos Amis</Text>
      <FlatList
        data={FRIENDS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Text style={{ color: '#fff', paddingVertical: 6 }}>
            {item.name} {item.mood ? MOOD_EMOJI[item.mood] : '—'}
          </Text>
        )}
      />
    </View>
  );
}
