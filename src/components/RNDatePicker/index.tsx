/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Pressable} from 'react-native';
import React from 'react';
import RNModal from '../RNModal';
import styles from './styles';
import {congratsModalProps} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MONTH_ARRAY} from '@tandem/constants/local';
import RNTextComponent from '../RNTextComponent';
import {translation} from '@tandem/utils/methods';
import themeColor from '@tandem/theme/themeColor';
import {YEARS_ARRAY} from '@tandem/constants/local';

const RNDatePicker = ({
  visible = false,
  renderModal = () => {},
  getMonthYear = () => {},
}: congratsModalProps) => {
  const date = new Date();
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const yearRef = React.useRef(null);
  const monthRef = React.useRef(null);
  const [month, setMonth] = React.useState(date.getMonth());
  const [year, setYear] = React.useState<number>(YEARS_ARRAY.length - 1);

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => {
        monthRef.current.scrollToIndex({
          animated: true,
          index: month - 1,
          // viewPosition: 0.35,
        });
        yearRef.current.scrollToIndex({
          animated: true,
          index: year,
          viewPosition: 0.35,
        });
      }, 300);
    }
  }, [visible]);

  // const onViewableItemsChangedForMonth = React.useCallback(
  //   ({viewableItems}: any) => {
  //     console.log(viewableItems, 'viewableItemsviewableItems234');
  //     if (viewableItems.length % 2 === 0 || true) {
  //       console.log(viewableItems, 'viewableItems');
  //       const firstIndex = viewableItems[0].index;
  //       // const lastIndex = viewableItems.slice(-1)[0].index;
  //       // const middleIndex = Math.round((lastIndex - firstIndex) / 2);
  //       setMonth(firstIndex + Math.round(viewableItems.length / 2 - 1));
  //     }
  //   },
  //   [],
  // );

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
          <FlatList
            data={MONTH_ARRAY}
            // onViewableItemsChanged={onViewableItemsChangedForMonth}
            initialNumToRender={MONTH_ARRAY.length + 1}
            contentContainerStyle={{alignItems: 'center'}}
            decelerationRate={5}
            style={{width: '50%'}}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  setMonth(index);
                }}
                style={[
                  styles.button,
                  month === index && {
                    borderWidth: 1,
                    borderColor: themeColor.black,
                  },
                ]}>
                <RNTextComponent
                  style={[
                    styles.text,
                    month === index && {color: 'black', fontWeight: '700'},
                  ]}>
                  {item.month}
                </RNTextComponent>
              </Pressable>
            )}
            keyExtractor={i => i.monthKey}
            showsVerticalScrollIndicator={false}
            ref={monthRef}
          />
          <View style={styles.line} />
          <FlatList
            data={YEARS_ARRAY}
            initialNumToRender={YEARS_ARRAY.length + 1}
            contentContainerStyle={{alignItems: 'center'}}
            style={{width: '50%'}}
            renderItem={({item, index}) => {
              console.log(year, index);
              return (
                <Pressable
                  onPress={() => {
                    setYear(item.index);
                  }}
                  style={[
                    styles.button,
                    year === index && {
                      borderWidth: 1,
                      borderColor: 'black',
                    },
                  ]}>
                  <RNTextComponent
                    style={[
                      styles.text,
                      year === item.index && {
                        color: 'black',
                        fontWeight: '700',
                      },
                    ]}>
                    {item.yearkey}
                  </RNTextComponent>
                </Pressable>
              );
            }}
            keyExtractor={i => i.index}
            showsVerticalScrollIndicator={false}
            ref={yearRef}
          />
        </View>
        <View style={styles.bottom}>
          <Pressable onPress={renderModal}>
            <RNTextComponent>{translation('CANCEL')}</RNTextComponent>
          </Pressable>
          <Pressable
            onPress={() => {
              getMonthYear(
                MONTH_ARRAY[date.getMonth()].monthKey,
                YEARS_ARRAY[year].yearkey,
              );
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
