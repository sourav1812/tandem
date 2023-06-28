import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import { styles } from './styels';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import Back from '../../assets/svg/Cross'
import RNButton from '../../components/RNButton';
import { SelectPlayerScreenProps } from '../../navigation/types';
import RNTextComponent from '../../components/RNTextComponent';
import en from '../../constants/api/lang/en';
import themeColor from '../../theme/themeColor';
import { player } from './interface';
import { COMPONENTSNAME } from '../../navigation/ComponentName';
import { checkIfTablet } from '../../hooks/isTabletHook';


const SelectPlayer = ({navigation} : SelectPlayerScreenProps) => {

  const players : player[] = [{name : "Alysa" , color : themeColor.gold} , {name : "Kashish" , color : themeColor.lightGreen}]
  const isTablet = checkIfTablet()

  return (
    <RNScreenWrapper style={styles.container} >
      <RNButton icon={<Back/>} onlyIcon onClick={()=>navigation.goBack()} />
      <RNTextComponent isSemiBold style={styles.heading} >
        {en.WHO_IS_GOING_TO}
      </RNTextComponent>

      <View style={[styles.scrollViewParent   , (isTablet && {maxWidth :295})  ]} >
        <ScrollView contentContainerStyle= {styles.scrollView} showsVerticalScrollIndicator={false} >
          {players.map((item, index)=> <Pressable style={[styles.players , {backgroundColor : item.color}]} onPress={()=>{
            navigation.navigate(COMPONENTSNAME.BOOKSHELF)
          }} />)}
        </ScrollView>
        </View>
    </RNScreenWrapper>
  );
};

export default SelectPlayer;
