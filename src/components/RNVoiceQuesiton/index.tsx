import { View, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState, version } from 'react'
import { styles } from './styles'
import RNTextComponent from '../RNTextComponent'
import { inputListState } from './interface'
import RNButton from '../RNButton'
import themeColor from '../../theme/themeColor'
import Mic from '../../assets/svg/Mic'
import MicOn from '../../assets/svg/MinOn'
import { verticalScale } from 'react-native-size-matters'
import { VoiceQuestionProps } from './interface'
import { checkIfTablet } from '../../hooks/isTabletHook'

const RNVoiceQuesiton = ({onClick } : VoiceQuestionProps) => {

    const isTablet = checkIfTablet()
    const [inputList, setInputList] = useState<inputListState[]>([{ answer: '' }])
    const [micStatus, setMicStatus] = useState(false)

    const toggleMic = () => {
        setMicStatus(!micStatus)
        if (inputList.length <= 5 && !micStatus) {
            const answerArry = [...inputList]
            answerArry.push({ answer: "" })
            setInputList(answerArry);
        }
    }

    return (
        <>
            <View style={styles.container} >
                <View style={{   maxHeight: verticalScale(425) }} >
                    <ScrollView style={styles.voiceQuestion} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(30) }} >
                        <View style={styles.emojiView} >
                            <RNTextComponent style={styles.emoji} >
                                🤔
                            </RNTextComponent>
                        </View>
                        <RNTextComponent style={styles.heading} isSemiBold>
                        How many animals can
                        you name that starts
                        with the letter C?
                        </RNTextComponent>
                        {inputList.map((item, index) => {
                            return (
                                <View style={styles.answerField}>
                                    <View style={styles.bullitin} >
                                        <RNTextComponent style={styles.leftText} isMedium >
                                            {index + 1}
                                        </RNTextComponent>
                                    </View>
                                    <TextInput
                                        style={[styles.input]}
                                        onChangeText={(e) => {
                                            let answerArry = [...inputList]
                                            answerArry[index].answer = e
                                            setInputList(answerArry)
                                        }}
                                        value={inputList[index].answer}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <Pressable onPress={toggleMic} style={styles.icon} >
                    {micStatus ? <MicOn /> : <Mic />}

                </Pressable>
            </View>
            <RNButton customStyle={styles.footerButton} title="I don't know" onClick={onClick} textStyle={{ color: themeColor.black , fontSize  :verticalScale(16)}} />
        </>
    )
}

export default RNVoiceQuesiton;