import React, {useState} from 'react';
import RNModal from '../RNModal';
import {View} from 'react-native';
import styles from './styles';
import RNTextComponent from '../RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '../RNButton';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import themeColor from '@tandem/theme/themeColor';
import {ScrollView} from 'react-native-gesture-handler';
import RNAvatarComponent from '../RNAvatarComponent';
import {avatarArray} from '@tandem/screens/CreateChildProfile/interface';

interface ChangeAvatarProps {
  visible: boolean;
  renderModal: () => void;
  getAvatar: (url: string | null) => void;
}

const RNChangeAvatarModal = ({
  visible,
  renderModal,
  getAvatar,
}: ChangeAvatarProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [avatar, setAvatar] = useState(null);

  return (
    <RNModal visible={visible} renderModal={renderModal}>
      <View style={styles.container}>
        <RNTextComponent isSemiBold style={styles.heading}>
          {translation('SELECT_AN_AVATAR')}
        </RNTextComponent>
        <View style={styles.avatarView}>
          <ScrollView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}>
            {avatarArray.map((item, index) => {
              return (
                <RNAvatarComponent
                  key={index.toString()}
                  icon={item.icon}
                  customStyle={[
                    styles.avatar,
                    avatar === item.icon && {
                      backgroundColor: themeColor.themeBlue,
                    },
                  ]}
                  imgStyle={styles.avatarImg}
                  onPress={() => {
                    setAvatar(item.icon);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 100}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            title={translation('CANCEL')}
            customStyle={styles.button}
            onClick={renderModal}
          />
          <RNButton
            title={translation('ACCEPT')}
            customStyle={[styles.button]}
            onClick={() => {
              getAvatar(avatar);
              renderModal();
            }}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNChangeAvatarModal;
