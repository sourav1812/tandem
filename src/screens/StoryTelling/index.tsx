import { View, ImageBackground,  FlatList, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { styles } from './style';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import RNButton from '../../components/RNButton';
import Close from '../../assets/svg/Cross';
import Speaker from '../../assets/svg/VolumeDown';
import RNTextComponent from '../../components/RNTextComponent';
import RNCharacterComponent from '../../components/RNCharacterComponent';
import { characterList } from './interface';
import { characterProps } from '../../components/RNCharacterComponent/interface';
import RNCongratsModal from '../../components/RNCongratsModal';
import { BlurView } from '@react-native-community/blur';
import themeColor from '../../theme/themeColor';
import { Text } from 'react-native-svg';


const StoryTelling = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [goToEnd, setGoToEnd] = useState(false)
  const [renderModal, setRenderModal] = useState(false)
  const renderStory = ({ index, item }: any) => {
    return (
      <ImageBackground style={styles.container} source={require('../../assets/png/storyBackground.png')} >
       {currentIndex +1 == 5 && <View >
          <View  style={styles.summary} >
          <ScrollView  showsVerticalScrollIndicator={false}>
            <RNTextComponent style={styles.title} isSemiBold>
              Magic Castle
            </RNTextComponent>
            <RNTextComponent style={styles.mainCharacter} isSemiBold>
              Main Characters
            </RNTextComponent>
            <View style={styles.characterList} >
              {characterList.map((item: characterProps) => {
                return (
                  <RNCharacterComponent characterName={item.characterName} url={item.url} customStyle={styles.boxStyle} />
                )
              })}
            </View>
            <RNTextComponent style={styles.content} >
            Fascinating children's book that recounts the exciting adventure of three friends, Tim, Lena, and Max. Together they go in search of the lost treasure, about which legends and tales are told. During their journey, the children encounter mysterious conspiracies, solve puzzles, and overcome dangers to reach their.
            </RNTextComponent>
          </ScrollView>
          </View>
        
          <RNButton title='Great!' customStyle={styles.footerButton} onClick={toggleModal} />
        </View>}
      </ImageBackground>
    )
  }
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const toggleModal = ()=>{
    setRenderModal(!renderModal)
  }

  return (
    <RNScreenWrapper>
      <View style={styles.headingButton} >
        <RNButton onlyIcon icon={<Close />} onClick={() => { }} />
        {currentIndex +1 == 5 && <RNTextComponent isSemiBold style={styles.summaryTitle} >
          Summary
        </RNTextComponent>}
        <RNButton onlyIcon icon={<Speaker />} onClick={() => { }} />
      </View>
      <FlatList
        data={Array.from({ length: 5 }, (_, i) => { return ({ index: i }) })}
        renderItem={renderStory}
        pagingEnabled
        horizontal
        decelerationRate={50}
        onEndReachedThreshold={2}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100 // adjust threshold as needed
        }}
        showsHorizontalScrollIndicator={false}
      />
      {currentIndex +1 != 5 &&    <ImageBackground style={styles.storyContent} blurRadius={20} source={require('../../assets/png/blurBgc.png')} imageStyle={styles.imageStyle} >
          <RNTextComponent style={styles.slideNo} isSemiBold >
            1/{currentIndex + 1}
          </RNTextComponent>
          <RNTextComponent style={[styles.slideNo, { color: themeColor.black, textAlign: 'center', zIndex : 3 }]} isSemiBold >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sunt quod culpa nulla praesentium accusantium voluptas sit esse, quibusdam dasperisi!
          </RNTextComponent>
        </ImageBackground>}
      <RNCongratsModal visible={renderModal} renderModal={toggleModal}  />
    </RNScreenWrapper>
  );
};

export default StoryTelling;
