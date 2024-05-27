import {store} from '@tandem/redux/store';

export default ({percentage, delay}: {percentage: number; delay: number}) => {
  const progressRef = store.getState().activityIndicator.progressRef;
  if (
    progressRef !== undefined &&
    progressRef !== null &&
    Object.keys(progressRef).length !== 0
  ) {
    setTimeout(() => {
      progressRef.animateProgress(percentage);
    }, delay);
  }
};
