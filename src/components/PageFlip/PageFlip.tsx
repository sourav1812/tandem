import React from 'react';
import {Project} from './Project';
import {StateObject} from '@tandem/screens/StoryTelling/interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {StoryData} from '@tandem/api/getStories/interface';

export const PageFlip = ({
  activeIndex,
  setActiveIndex,
  textArray,
  tooltipState,
  setTooltipState,
  readingLevel,
  book,
}: {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  textArray?: {text: string; img: any}[];
  tooltipState: StateObject;
  setTooltipState: React.Dispatch<React.SetStateAction<StateObject>>;
  book: StoryData;
  readingLevel: boolean;
}) => {
  const [TextArrayToSend, setTextArrayToSend] = React.useState(
    [...(textArray || [])].reverse(),
  );
  const storyLevel = useAppSelector(state => state.storyLevel.level);

  React.useEffect(() => {
    console.log({storyLevel});
    const pages = book.storyInfo[storyLevel].pages;

    const textArrayModified = (textArray || []).map((obj, index) => ({
      img: obj.img,
      text: pages[index].text,
    }));
    textArrayModified.reverse();
    setTextArrayToSend(textArrayModified);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyLevel]);

  return (
    <Project
      readingLevel={readingLevel}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      textArray={TextArrayToSend}
      tooltipState={tooltipState}
      setTooltipState={setTooltipState}
    />
  );
};
