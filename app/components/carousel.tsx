"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

interface CarouselProps {
  images: { id: number; src: string; link: string }[];
  options?: EmblaOptionsType;
}

const Carousel: React.FC<CarouselProps> = ({ images, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    startIndex: Math.floor(Math.random() * images.length),
    ...options,
  });

  const router = useRouter();
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__img") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();

    emblaApi.scrollSnapList().forEach((scrollSnap: number, snapIndex: number) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex: number) => {
        if (!slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem: { target: () => number; index: number }) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              diffToTarget = sign === -1 ? scrollSnap - (1 + scrollProgress) : scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0.8, 1.2); // Expanded range: 0.8 (non-focused) to 1.2 (focused)
        const opacity = numberWithinRange(tweenValue, 0.3, 1);
        const blur = numberWithinRange((1 - tweenValue) * 2, 0, 2);
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = `${opacity}`;
          tweenNode.style.filter = `blur(${blur}px)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale);

    return () => {
      emblaApi.off("reInit", setTweenNodes);
      emblaApi.off("reInit", setTweenFactor);
      emblaApi.off("reInit", tweenScale);
      emblaApi.off("scroll", tweenScale);
    };
  }, [emblaApi, tweenScale]);

  const handleComicClick = (id: number) => {
    router.push(`/comics?comic=${id}`);
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((comic) => (
            <div className="embla__slide" key={comic.id}>
              <div className="embla__slide__img cursor-pointer" onClick={() => handleComicClick(comic.id)}>
                <img
                  src={comic.src}
                  alt={`Comic ${comic.id + 1}`}
                  className="w-full h-full object-cover rounded-md shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;