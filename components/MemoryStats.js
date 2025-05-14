import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Surface, Title, useTheme } from 'react-native-paper';

export default function MemoryStats() {
  const { colors } = useTheme();
  const [stats, setStats] = useState({ total:0, free:0 });

  useEffect(()=>{
    (async()=>{
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free  = await FileSystem.getFreeDiskStorageAsync();
      setStats({ total, free });
    })();
  },[]);

  const used = stats.total - stats.free;
  const fmt = v=> (v/1e9).toFixed(1)+' ГБ';

  return (
    <Surface style={[styles.surface, { backgroundColor: colors.primary }]}>
      <Title style={{ color:'#fff' }}>Пам’ять пристрою</Title>
      <View style={styles.row}>
        <Text style={styles.text}>Всього: {fmt(stats.total)}</Text>
        <Text style={styles.text}>Вільно: {fmt(stats.free)}</Text>
        <Text style={styles.text}>Зайнято: {fmt(used)}</Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 12,
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  row: { flexDirection:'row', justifyContent:'space-around', marginTop:4 },
  text: { color:'#fff', fontSize:12 },
});
