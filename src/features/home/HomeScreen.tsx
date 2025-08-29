// src/features/home/HomeScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Mood, MOOD_EMOJI, MOOD_LABEL } from '../../shared/types/mood';

const { width } = Dimensions.get('window');

// --- Carrousel ---
const CARD_W = 100;
const SPACING = 18;
const SNAP = CARD_W + SPACING;
const MOODS: Mood[] = ['eat', 'gaming', 'drive', 'movie', 'chill', 'busy'];

// --- Propositions (mock) ---
const PROPOSALS = [
  { id: 'p1', mood: 'eat' as Mood, title: 'Tacos à Argenteuil 20h', by: 'Mehdi', with: 'Lina' },
  { id: 'p2', mood: 'gaming' as Mood, title: 'Valorant 21h', by: 'Sarah', with: undefined },
];

export default function HomeScreen() {
  const [mood, setMood] = useState<Mood | undefined>();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderMood = ({ item, index }: { item: Mood; index: number }) => {
    const inputRange = [
      (index - 2) * SNAP,
      (index - 1) * SNAP,
      index * SNAP,
      (index + 1) * SNAP,
      (index + 2) * SNAP,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 0.92, 1.08, 0.92, 0.85],
      extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 0.75, 1, 0.75, 0.5],
      extrapolate: 'clamp',
    });

    const selected = mood === item;

    return (
      <Animated.View
        style={[
          styles.moodCard,
          {
            transform: [{ scale }],
            opacity,
            shadowOpacity: selected ? 0.35 : 0.22,
          },
        ]}
      >
        <Pressable
          onPress={() => setMood(item)}
          android_ripple={{ color: '#1e293b' }}
          style={[styles.moodInner, selected && styles.moodInnerSelected]}
        >
          <Text style={[styles.emoji, selected && styles.emojiSelected]}>
            {MOOD_EMOJI[item]}
          </Text>
          <Text style={styles.moodLabel} numberOfLines={1}>
            {MOOD_LABEL[item]}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#0c1843', '#0a112c', '#060a17']} // bleu -> presque noir
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.screen}>
        <Text style={styles.h1}>Ce soir je suis</Text>

        {/* Carrousel de moods */}
        <Animated.FlatList
          data={MOODS}
          keyExtractor={(m) => m}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderMood}
          snapToInterval={SNAP}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingHorizontal: (width - SNAP) / 2,
          }}
          ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
        />

        {/* Sélecteur d'heure XXL */}
        <View style={{ alignItems: 'center', marginTop: 26 }}>
          <Pressable onPress={() => setShowPicker(true)} style={styles.timeBox}>
            <Text style={styles.timeText}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text style={styles.timeSub}>Heure souhaitée</Text>
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

        {/* Actions */}
        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => console.log('VALIDER', { mood, time })}
            style={[styles.btn, !mood && { opacity: 0.5 }]}
            disabled={!mood}
          >
            <Text style={styles.btnText}>Valider</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log('PROPOSER', { mood, time })}
            style={[styles.btn, styles.btnGhost]}
          >
            <Text style={[styles.btnText, styles.btnGhostText]}>Proposer</Text>
          </Pressable>
        </View>

        {/* Propositions */}
        <Text style={styles.sectionTitle}>Propositions</Text>
        <FlatList
          data={PROPOSALS}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={styles.cardEmoji}>{MOOD_EMOJI[item.mood]}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardBy}>
                Par {item.by}
                {item.with ? <Text style={styles.cardWith}>   avec {item.with}</Text> : null}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  h1: {
    color: '#e9efff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // --- Mood cards ---
  moodCard: {
    width: SNAP - SPACING,
    height: 138,                 // plus haut pour éviter la coupe
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,         // espace top/bottom pour l’emoji
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 8,
  },
  moodInner: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  moodInnerSelected: {
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  emoji: {
    fontSize: 56,                          // emojis XXL
    textShadowColor: 'rgba(0,0,0,0.85)',   // effet “3D”
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 7,
  },
  emojiSelected: {
    fontSize: 64,
  },
  moodLabel: {
    marginTop: 8,
    color: '#c8d4ff',
    fontSize: 12,
    opacity: 0.9,
  },

  // --- Time box ---
  timeBox: {
    width: '84%',                // plus large
    paddingVertical: 24,         // plus haut
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  timeSub: {
    color: '#c7d2fe',
    marginTop: 6,
    fontSize: 12,
    opacity: 0.9,
  },

  // --- Buttons ---
  actionsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 18,
    marginBottom: 6,
  },
  btn: {
    flex: 1,
    backgroundColor: '#e6edff',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  btnText: {
    color: '#0b1533',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  btnGhost: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  btnGhostText: {
    color: '#e6edff',
  },

  // --- Proposals ---
  sectionTitle: {
    color: '#c7d2fe',
    fontSize: 20,
    marginTop: 22,
    marginBottom: 10,
    fontWeight: '700',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardTitle: {
    color: '#f4f7ff',
    fontSize: 18,
    fontWeight: '800',
  },
  cardBy: {
    color: '#a9b4d9',
    marginTop: 6,
  },
  cardWith: {
    color: '#cdd6f8',
    fontStyle: 'italic',
  },
});
