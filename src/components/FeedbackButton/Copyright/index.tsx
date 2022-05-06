import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function Copyright() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Feito com ❤ por Luke e Rocketseat
        </Text>
    </View>
  );
}