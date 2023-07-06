import { View, Text , ViewStyle, Pressable, Alert} from 'react-native'
import React  , {useState} from 'react'
import { styles } from './styles'
import Inactive from '../../assets/svg/InactiveCheckbox'
import Active from '../../assets/svg/ActiveCheckbox'
import RNTextComponent from '../RNTextComponent'

export interface Props {
    customStyle ?: ViewStyle
}


const RNCheckboxWithText = ({customStyle}:Props) => {
    const [select, setSelect] = useState(false)

    const toggleCheckbox = ()=>{
        setSelect(!select)
    }

  return (
    <View style={styles.container} >
        <Pressable onPress={toggleCheckbox}>
        {
            select ? (<Active/>) : (<Inactive/>)
        }
        </Pressable>
        <RNTextComponent style={styles.text} >
        I agree to the terms and conditions of the End-User License Agreement.
        </RNTextComponent>
    </View>
  )
}

export default RNCheckboxWithText