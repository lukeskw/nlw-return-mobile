import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import { Option } from '../Option'

import { feedbackTypes } from '../../../utils/feedbackTypes'
import { styles } from './styles';
import { FeedbackType } from '../Widget';

interface Props {
  onFeedbackChanged: (feedbackType:FeedbackType) => void;
}
export function Options({onFeedbackChanged}: Props ) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>
      Deixe o seu feedback!
    </Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes)
            .map(([key, value]) =>(
              <Option 
                key={key} 
                title={value.title}
                image={value.image}
                onPress={()=> onFeedbackChanged(key as FeedbackType)}
              />
            ))
        }
      </View>
      <Copyright />
    </View>
  );
}