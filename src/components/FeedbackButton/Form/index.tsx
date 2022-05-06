import { ArrowLeft } from 'phosphor-react-native';
import React, { useState, useEffect } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Pressable
} from 'react-native';
import { theme } from '../../../theme';

import { styles } from './styles';

import { captureScreen } from 'react-native-view-shot';

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { SendButton } from '../SendButton';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}
import { feedbackTypes } from '../../../utils/feedbackTypes';
import { showMessage } from 'react-native-flash-message';
import { api } from '../../../services/api';
import * as FileSystem from 'expo-file-system';

export function Form({feedbackType, onFeedbackSent, onFeedbackCanceled}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [screenshot, setScreenshot] = useState<string|null>(null);
  const [comment, setComment] = useState<string|null>("");
  const feedbackInfo = feedbackTypes[feedbackType];
  const [disabled, setDisabled] = useState(false)
  const [opacity, setOpacity] = useState(0.5)

  const handleScreenshot = () => {
    captureScreen({
      format: 'png',
      quality: 0.8
    })
    .then(uri => {
      setScreenshot(uri);
      showMessage({
        message: "Screenshot capturada com sucesso!",
        type: "info",
        statusBarHeight: 50,
        duration: 3000,
        floating: true,
        backgroundColor: `${theme.colors.brand}`,
        color: `${theme.colors.text_primary}`,
        titleStyle: {
          fontFamily: `${theme.fonts.medium}`,
          fontSize: 14,
          textAlign: "center",
        },
      });
    })
    .catch(error => console.error(error));
  }

  const handleEmptyMessage = () => {
    if(disabled) {
      return
    }
    showMessage({
      message: "Insira uma mensagem!",
      type: "warning",
      statusBarHeight: 50,
      duration: 3000,
      floating: true,
      backgroundColor: `${theme.colors.brand}`,
      color: `${theme.colors.text_primary}`,
      titleStyle: {
        fontFamily: `${theme.fonts.medium}`,
        fontSize: 14,
        textAlign: "center",
      },
    });
    setDisabled(true)

    setTimeout(() => {
      setDisabled(false);
    },3500)
  }

  const handleScreenshotRemove = () => {
    setScreenshot(null);
  }

  const handleSendFeedback = async () => {
    if(isSendingFeedback){
      return
    }
    setIsSendingFeedback(true)

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

    try{
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      }).catch(err=> {throw new Error(err)});
      onFeedbackSent();

    }catch(err){
      setIsSendingFeedback(false);
      console.error(err);
    }
  
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo.image}
            style={styles.image}
          />
            <Text style={styles.titleText}>
                {feedbackInfo.title}
            </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.textInput}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
          screenshot= {screenshot}
        />
        <Pressable onPress={!comment ? handleEmptyMessage: null} style={{flex:1}}>
        <SendButton
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
          disabled={!comment ? true : false}
          opacity={!comment ? 0 : 1}
        />
        </Pressable>
      </View>
    </View>
  );
}