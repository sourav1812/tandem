import {STORY_PARTS} from '@tandem/constants/enums';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {store} from '@tandem/redux/store';

export default (type: string) => {
  if (type === STORY_PARTS.INCLUSION) {
    store.dispatch(pushStoryGenerationResponse({key: type, value: null}));
    return;
  }
  store.dispatch(pushStoryGenerationResponse({key: type, value: []}));
};
