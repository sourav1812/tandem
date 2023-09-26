import {View, FlatList, Pressable} from 'react-native';
import React from 'react';
import RNModal from '../RNModal';
import styles from './styles';
import {congratsModalProps} from './interface';
import {verticalScale} from 'react-native-size-matters';

import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MONTH_ARRAY} from '@tandem/constants/local';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {translation} from '@tandem/utils/methods';

const RNDatePicker = ({
  visible = false,
  renderModal = () => {},
  getMonthYear = () => {},
}: congratsModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const date = new Date();
  //   const yearRef = React.useRef(null);
  //   const monthRef = React.useRef(null);
  const [month, setMonth] = React.useState(
    MONTH_ARRAY[date.getMonth()].monthKey,
  );
  const [year, setYear] = React.useState<number>(date.getFullYear());

  const yearsDiff = Math.abs(1970 - date.getFullYear());

  //   React.useEffect(() => {
  //     if (visible) {
  //       setTimeout(() => {
  //         monthRef.current.scrollToIndex({
  //           animated: true,
  //           index: date.getMonth(),
  //           viewPosition: 0.5,
  //         });
  //         yearRef.current.scrollToEnd({
  //           animated: true,
  //         });
  //       }, 1000);
  //     }
  //   }, [date, visible]);

  return (
    <RNModal
      customStyle={styles.modal}
      visible={visible}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(320), alignSelf: 'center'},
        ]}>
        <View style={styles.top}>
          <View style={styles.box}>
            <FlatList
              data={MONTH_ARRAY}
              //   ref={monthRef}
              contentContainerStyle={{alignItems: 'center'}}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setMonth(item.monthKey);
                  }}
                  style={[
                    styles.button,
                    month === item.monthKey && {
                      borderWidth: 1,
                      borderColor: themeColor.black,
                    },
                  ]}>
                  <RNTextComponent
                    style={[
                      styles.text,
                      month === item.monthKey && {color: 'black'},
                    ]}>
                    {item.month}
                  </RNTextComponent>
                </Pressable>
              )}
              keyExtractor={i => i.monthKey}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.box}>
            <FlatList
              data={Array.from({length: yearsDiff + 1}, (_, i) => {
                return {yearKey: 1970 + i};
              })}
              contentContainerStyle={{alignItems: 'center'}}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setYear(item.yearKey);
                  }}
                  style={[
                    styles.button,
                    year === item.yearKey && {
                      borderWidth: 1,
                      borderColor: 'black',
                    },
                  ]}>
                  <RNTextComponent
                    style={[
                      styles.text,
                      year === item.yearKey && {color: 'black'},
                    ]}>
                    {item.yearKey}
                  </RNTextComponent>
                </Pressable>
              )}
              keyExtractor={i => i.yearKey}
              showsVerticalScrollIndicator={false}
              //   ref={yearRef}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Pressable onPress={renderModal}>
            <RNTextComponent>{translation('CANCEL')}</RNTextComponent>
          </Pressable>
          <Pressable
            onPress={() => {
              getMonthYear(month, year);
              renderModal();
            }}>
            <RNTextComponent>{translation('OK')}</RNTextComponent>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
};

export default RNDatePicker;
