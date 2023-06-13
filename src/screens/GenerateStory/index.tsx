import { View, Text } from 'react-native'
import React from 'react'
import RNScreenWrapper from '../../components/RNScreenWrapper';
import { styles } from './styles';
import RNHeaderIconButton from '../../components/RNHeaderIconButton';
import RNTextComponent from '../../components/RNTextComponent';


const GenerateStory = () => {
  return (
    <RNScreenWrapper>
        <View style={styles.container} >
            <View style={styles.header} >
                <RNHeaderIconButton label='<' />
                <RNTextComponent style={styles.heading} isSemiBold >Generate Story <RNTextComponent isSemiBold style={styles.questionNumber} >1/6</RNTextComponent></RNTextComponent>
                <RNHeaderIconButton/>
            </View>
        </View>
    </RNScreenWrapper>
  )
}

export default GenerateStory;