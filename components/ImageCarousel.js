import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import icStyles from '@/styles/ImageCarousel.module.css';

export default function ImageCarousel({ altText, images }) {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const onClickNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onClickPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setShowPrevButton(emblaApi.canScrollPrev());
      setShowNextButton(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect]);

  const generateSlides = () => {
    return images.map(({ url }, index) => {
      return (
        <div className={icStyles.slide} key={index}>
          <Image
            src={url}
            alt={`An image of ${altText}`}
            fill
            sizes='345px'
            quality={100}
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      );
    });
  };

  return (
    <div className={icStyles.outerContainer} ref={emblaRef}>
      <div className={icStyles.innerContainer}>
        {images && generateSlides()}
      </div>

      <div className={images.length > 1 ? icStyles.buttonContainer : icStyles.buttonContainerHidden}>
        <button
          className={`${icStyles.button} ${icStyles.buttonLeft}`}
          onClick={onClickPrev}
          disabled={!showPrevButton}
        >
          <Image
            height={18}
            width={18}
            src="/images/dark-chevron-left.svg"
            alt="An icon indicating a dropdown menu"
            />
        </button>

        <button
          className={`${icStyles.button} ${icStyles.buttonRight}`}
          onClick={onClickNext}
          disabled={!showNextButton}
        >
          <Image
            height={18}
            width={18}
            src="/images/dark-chevron-right.svg"
            alt="An icon indicating a dropdown menu"
          />
        </button>
      </div>
    </div>
  );
};