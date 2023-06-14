import { View, Text } from 'react-native'
import React, {useState} from 'react'
import RNScreenWrapper from '../../components/RNScreenWrapper';
import { styles } from './styles';
import RNHeaderIconButton from '../../components/RNHeaderIconButton';
import RNTextComponent from '../../components/RNTextComponent';
import themeColor from '../../theme/themeColor';


const GenerateStory = () => {

  const [questionNumber, setQuestionNumber] = useState<number>(0)


  return (
    <RNScreenWrapper>
        <View style={styles.container} >
            <View style={styles.header} >
                <RNHeaderIconButton label="<" />
                <RNTextComponent style={styles.heading} isSemiBold >Generate Story <RNTextComponent isSemiBold style={styles.questionNumber} >1/6</RNTextComponent></RNTextComponent>
                <RNHeaderIconButton label="?"  />
            </View>
            <View style={styles.progressBar} >
              {Array.from({length : 6}, (_,index)=>{
                return (
                  {index : index}
                )
              }).map((index , value)=>{
                return (
                  <View style={{...styles.indicator , backgroundColor  : index.index==questionNumber ? themeColor.themeBlue   : 'rgba(66, 133, 246, 0.5)'  }} />
                )
              })}
            </View>
        </View>
    </RNScreenWrapper>
  )
}

export default GenerateStory;