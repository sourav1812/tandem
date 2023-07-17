import {View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNButton from '@tandem/components/RNButton';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import Back from '@tandem/assets/svg/LeftArrow';
import Options from '@tandem/assets/svg/ThreeDots';
import RNMenuModal from '@tandem/components/RNMenuModal';
import navigateTo from '@tandem/navigation/navigate';
import {verticalScale} from 'react-native-size-matters';

const Story = () => {
  const [visible, setVisible] = useState(false);

  const toggelMenuBar = () => {
    setVisible(!visible);
  };

  return (
    <>
      <RNScreenWrapper>
        <View style={styles.headerButtons}>
          <RNButton
            onlyIcon
            icon={<Back />}
            onClick={() => {
              navigateTo();
            }}
          />
          <RNButton onlyIcon icon={<Options />} onClick={() => {}} />
          <RNMenuModal visible={visible} renderModal={toggelMenuBar} />
        </View>

        <View style={styles.container}>
          <Image
            style={styles.poster}
            source={{
              uri: 'https://i.pinimg.com/originals/92/bc/57/92bc5785532102412df54f1623bf0c02.jpg',
            }}
          />
          <View style={styles.scrollView}>
            <View style={styles.midContent}>
              <View style={styles.rating}>
                <RNTextComponent style={styles.emoji}>😍</RNTextComponent>
              </View>
              <View style={styles.duration}>
                <RNTextComponent style={styles.emoji} isSemiBold>
                  New
                </RNTextComponent>
              </View>
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dateTime}>
                <RNTextComponent style={styles.date}>
                  14.08.2023
                </RNTextComponent>
                <RNTextComponent
                  style={[styles.date, {color: 'rgba(0, 0, 0, 0.6)'}]}>
                  {'     '}2 min reading
                </RNTextComponent>
              </View>
              <RNTextComponent isSemiBold style={styles.heading}>
                Lola and her friends
              </RNTextComponent>
              <RNTextComponent style={styles.story}>
                A silly parrot, an adventurous iguana, and a young girl called
                Lola. Make the story about them going on an adventure, and
                finding new friends".{'\n'}
                {'\n'}
                Once upon a time, in a vibrant, lush rainforest full of colorful
                flowers and the sweetest fruits.
              </RNTextComponent>
            </ScrollView>
          </View>
          <RNButton
            title="Rereads"
            customStyle={styles.button}
            textStyle={{fontSize: verticalScale(14)}}
            onClick={() => {
              navigateTo(SCREEN_NAME.STORY_TELLING);
            }}
          />
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default Story;
