import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import CARD_ITEM from '../../utils/getItemCardSize';
import ScreenGridSizeActions from '../../store/grid/actions';
import { USER_TYPES } from '../../store/user/types';
import { NavigationInterface } from '../types';

import { Container, ImageContainer, Image } from './styles';
interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function SplashScreen({ navigation }: SplashScreenProp) {
  const { colors } = useThemeContext();
  const { dispatch } = useStoreContext();

  const [splash, setSplash] = useState({
    appLogoLoaded: true,
    pregnancyLogoLoaded: false,
    mobileGridSize: { cardSize: 320, numOfColumn: 1 }
  });

  useEffect(() => {
    handleAppLayout();
    setTimeout(
      () =>
        setSplash({
          ...splash,
          appLogoLoaded: false,
          pregnancyLogoLoaded: true
        }),
      2000
    );
    setTimeout(checkInitialLaunch, 4000);
  }, []);

  const handleAppLayout = () => {
    const { cardSize, numOfColumn } = CARD_ITEM;
    setSplash({ ...splash, mobileGridSize: { cardSize, numOfColumn } });
    ScreenGridSizeActions(dispatch, CARD_ITEM);
  };

  const checkInitialLaunch = async () => {
    // do checks here for initial launch and subsequent launch
    navigation.replace('HomeScreen');
  };

  return (
    <Container
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
      testID="app-container"
    >
      {splash.appLogoLoaded && (
        <ImageContainer>
          <Image
            style={{
              resizeMode: 'contain',
              width: '60%',
              height: '100%',
              bottom: 50,
              left: 10
            }}
            source={require('../../../assets/images/splash.png')}
            fadeDuration={0}
            testID="app-icon"
          />
        </ImageContainer>
      )}

      {splash.pregnancyLogoLoaded && (
        <Image
          style={{ resizeMode: 'stretch' }}
          source={require('../../../assets/images/splash_pregnancy.png')}
          fadeDuration={0}
          testID="pregnancy-photo"
        />
      )}

      {splash.pregnancyLogoLoaded ? (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', bottom: 100 }}
        />
      ) : null}
    </Container>
  );
}
