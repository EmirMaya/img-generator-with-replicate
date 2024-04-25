import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type SlideType = {
  id: number;
  src: string;
  alt: string;
};

type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay: any = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop: any =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla m-auto md:h-[500px] md:w-[1050px] max-w-screen flex flex-col justify-center md:px-32">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <Image
                className="w-2/3 rounded-md"
                src={slide.src}
                alt={slide.src}
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls m-auto max-w-[200px]">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
