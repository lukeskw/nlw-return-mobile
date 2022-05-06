import React, { useEffect } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps{
  isLoading: boolean;
  opacity: number;

}

export function SendButton({isLoading, opacity, ...rest}: Props) {
  return (
    <TouchableOpacity 
      style={opacity ===1 ? styles.container : styles.disabled}
      {...rest}
    >
      {
        isLoading 
        ? <ActivityIndicator 
            color={theme.colors.text_on_brand_color}/>
        : <Text style={styles.text}> Enviar Feedback</Text>
      }
    </TouchableOpacity>
  );
}