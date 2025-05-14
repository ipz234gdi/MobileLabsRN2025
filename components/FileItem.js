import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';

export default function FileItem({ item, onOpen, onDelete, onInfo }) {
  const { colors } = useTheme();
  return (
    <Card style={[styles.card, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={onOpen} style={styles.row}>
        <Text style={{ flex:1, color: colors.text }}>
          {item.isDirectory ? '📁' : '📄'} {item.name}
        </Text>
        <IconButton icon="information" size={20} onPress={onInfo} />
        <IconButton icon="delete"      size={20} onPress={onDelete} />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,       // тінь
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
});
