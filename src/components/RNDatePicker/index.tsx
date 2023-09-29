/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        monthRef.current?.scrollToIndex({
          animated: true,
          index: month === 0 ? 0 : month - 1,
        });
        yearRef.current?.scrollToIndex({
          animated: true,
          index: year ? year : YEARS_ARRAY.length - 1,
        });
      }, 300);
    }
    return () => {
      setMonth(date.getMonth());
      setYear(YEARS_ARRAY.length - 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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
            initialNumToRender={MONTH_ARRAY.length + 1}
            contentContainerStyle={{alignItems: 'center'}}
            decelerationRate={5}
            style={{width: '50%'}}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  setMonth(index);
                  setIsDatePickerUsed(true);
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
              return (
                <Pressable
                  onPress={() => {
                    setYear(item.index);
                    setIsDatePickerUsed(true);
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
            keyExtractor={i => i.yearkey.toString()}
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
              const newDateISO = new Date(
                `${YEARS_ARRAY[year].yearkey}-${month + 1}-01T01:01:01.000Z`,
              ).toISOString();
              if (isDatePickerUsed) {
                getMonthYear(newDateISO);
              }
              setIsDatePickerUsed(false);
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
