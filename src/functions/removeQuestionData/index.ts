import {STORY_PARTS} from '@tandem/constants/enums';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {store} from '@tandem/redux/store';

export default (type: string) => {
  if (type === STORY_PARTS.INCLUSION) {
    store.dispatch(pushStoryGenerationResponse({key: type, value: null}));
    return;
  }
  store.dispatch(pushStoryGenerationResponse({key: type, value: []}));
};

export const goBackInOrder = () => {
  const questionRef = store.getState().storyGeneration;
  // if (questionRef[STORY_PARTS.COLOR].length > 0 ) {
  //   navigateTo(SCREEN_NAME.GENERATE_STORY_COLORS);
  //   return;
  // }
  if (questionRef[STORY_PARTS.STYLES].length > 0) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_ILLUSTRATIONS);
    return;
  }
  if (questionRef[STORY_PARTS.WHERE].length > 0) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_WHERE);
    return;
  }
  if (questionRef[STORY_PARTS.WHAT_THINGS].length > 0) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_WHAT_THINGS);
    return;
  }
  if (questionRef[STORY_PARTS.INCLUSION] !== null) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_INCLUSION);
    return;
  }
  if (questionRef[STORY_PARTS.WHO].length > 0) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_WHO);
    return;
  }
  if (questionRef[STORY_PARTS.WHAT_HAPPENS].length > 0) {
    navigateTo(SCREEN_NAME.GENERATE_STORY_WHAT_HAPPENS);
    return;
  }
  navigateTo(SCREEN_NAME.HOME);
};
