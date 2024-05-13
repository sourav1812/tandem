import React, {useState} from 'react';
import RNModal from '../RNModal';
import {Keyboard, View} from 'react-native';
import styles from './styles';
import RNTextComponent from '../RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '../RNButton';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import themeColor from '@tandem/theme/themeColor';
import {ScrollView} from 'react-native-gesture-handler';
import RNAvatarComponent from '../RNAvatarComponent';

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
  // const socialLoginData = useAppSelector(
  //   state => state.socialLogin.socialDataObject,
  // );

  const [avatar, setAvatar] = useState<null | string>(null);
  // const [pickerUrl, setPickerUrl] = useState<null | string>(
  //   socialLoginData.image !== '' ? socialLoginData.image : null,
  // );
  const avatars = useAppSelector(state => state.cache.avatars);

  React.useEffect(() => {
    Keyboard.dismiss();
  }, [visible]);

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
            {avatars.map((item, index) => {
              return (
                <RNAvatarComponent
                  key={index.toString()}
                  icon={item.file}
                  customStyle={[
                    styles.avatar,
                    avatar === item.path && {
                      backgroundColor: themeColor.themeBlue,
                    },
                  ]}
                  imgStyle={styles.avatarImg}
                  onPress={() => {
                    setAvatar(item.path);
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
