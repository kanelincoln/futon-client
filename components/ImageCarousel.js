import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import imageCarouselStyles from '@/styles/ImageCarousel.module.css';

export default function ImageCarousel({ altText, imagePaths }) {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ draggable: false });

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
    return imagePaths.map((path, index) => {
      return (
        <div className={imageCarouselStyles.slide} key={index}>
          <Image
            src={path}
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
    <div className={imageCarouselStyles.outerContainer} ref={emblaRef}>
      <div className={imageCarouselStyles.innerContainer}>
        {imagePaths && generateSlides()}
      </div>

      <div className={imageCarouselStyles.buttonContainer}>
        <button
          className={`${imageCarouselStyles.button} ${imageCarouselStyles.buttonLeft}`}
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
          className={`${imageCarouselStyles.button} ${imageCarouselStyles.buttonRight}`}
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