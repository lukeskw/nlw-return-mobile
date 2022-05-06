// import React from 'react';
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { styles } from "./styles";
import { theme } from "../../../theme";
import { Options } from "../Options";
import { Form } from "../Form";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType|null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  }

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  const handleFeedbackSent = () => {
    setFeedbackSent(true);
  }
  return (
      <>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleOpen}
          >
          <ChatTeardropDots 
            weight="bold"
            size={24}
            color={theme.colors.text_on_brand_color}
          />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1,280]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}
          keyboardBehavior="extend"
        >
          {
            feedbackSent
            ? <Success onSendAnotherFeedback={handleRestartFeedback} />
            :
              <>
                {
                feedbackType 
                ? <Form 
                  feedbackType={feedbackType} 
                  onFeedbackCanceled={handleRestartFeedback} 
                  onFeedbackSent={handleFeedbackSent}
                  />
                : <Options onFeedbackChanged = {setFeedbackType}/>
                }
              </>
          }
        </BottomSheet>
      </>
  )
}

export default gestureHandlerRootHOC(Widget);