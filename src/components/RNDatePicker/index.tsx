/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import RNModal from '../RNModal';
import styles from './styles';
import {congratsModalProps} from './interface';
import {verticalScale, scale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MONTH_ARRAY} from '@tandem/constants/local';
import RNTextComponent from '../RNTextComponent';
import {translation} from '@tandem/utils/methods';
import themeColor from '@tandem/theme/themeColor';
import {YEARS_ARRAY} from '@tandem/constants/local';
import {RootState} from '@tandem/redux/store';

const RNDatePicker = ({
  visible = false,
  renderModal = () => {},
  getMonthYear = () => {},
}: congratsModalProps) => {
  const date = new Date();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const [month, setMonth] = React.useState(date.getMonth());
  const [year, setYear] = React.useState<number>(YEARS_ARRAY.length - 1);
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);

  return (
    <RNModal
      customStyle={styles.modal}
      visible={visible}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          {flex: portrait ? 0.74 : 1},
          isTablet && {width: verticalScale(320), alignSelf: 'center'},
        ]}>
        <View style={styles.top}>
          {/* <FlatList
            data={MONTH_ARRAY}
            initialNumToRender={MONTH_ARRAY.length}
            initialScrollIndex={month - 2 >= 0 ? month - 2 : month}
            getItemLayout={(_, index) => ({
              length: verticalScale(30),
              offset: verticalScale(30) * index,
              index,
            })}
            contentContainerStyle={{alignItems: 'center'}}
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
                    {fontSize: isTablet ? scale(10.5) : scale(13)},

                    month === index && {color: 'black', fontWeight: '700'},
                  ]}>
                  {item.month}
                </RNTextComponent>
              </Pressable>
            )}
            keyExtractor={i => i.monthKey}
            showsVerticalScrollIndicator={false}
          /> */}
          {/* <View style={styles.line} /> */}
          <FlatList
            data={YEARS_ARRAY}
            initialNumToRender={YEARS_ARRAY.length}
            getItemLayout={(_, index) => ({
              length: verticalScale(30),
              offset: verticalScale(30) * index,
              index,
            })}
            initialScrollIndex={year - 2 >= 0 ? year - 2 : year}
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
                      {fontSize: isTablet ? scale(10.5) : scale(13)},
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
          />
        </View>
        <View style={styles.bottom}>
          <Pressable onPress={renderModal} hitSlop={30}>
            <RNTextComponent
              style={{fontSize: isTablet ? scale(11) : scale(13)}}>
              {translation('CANCEL')}
            </RNTextComponent>
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
            }}
            hitSlop={30}>
            <RNTextComponent
              style={{fontSize: isTablet ? scale(11) : scale(13)}}>
              {translation('OK')}
            </RNTextComponent>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
};

export default RNDatePicker;
