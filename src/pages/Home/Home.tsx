import { Button } from "components/ui";
import { useState } from "react";
import style from "./Home.module.css";
import cn from "classnames";
import {
  SvgArrowRight,
  SvgArrowLeft,
  SvgWorld,
  SvgPercent,
  SvgClock,
  SvgLightning,
} from "assets/images/svg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import LinkWithSearchParams from "components/LinkWithSearchParams";

import Land from "assets/images/png/land.webp";
import slide1 from "assets/images/png/slide1.png";
import slide2 from "assets/images/png/slide2.png";
import slide3 from "assets/images/png/slide3.png";
import slide4 from "assets/images/png/slide4.png";
import slide5 from "assets/images/png/slide5.png";
import slide6 from "assets/images/png/slide6.png";
import slide7 from "assets/images/png/slide7.png";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    mode: "free-snap",
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 30,
    },
  });

  const figures = [
    {
      label: "Liquidity Sources",
      value: "345",
    },
    {
      label: "Total Volume",
      value: "$281B+",
    },
    {
      label: "Total Wallets",
      value: "4.4M+",
    },
    {
      label: "Total Trades",
      value: "28.7M+",
    },
  ];

  const states = [
    {
      icon: <SvgWorld />,
      label: "Deposit & Borrow TVL",
      value: "12,956.85 ETH",
      comment: "($21,155,944.68)",
    },
    {
      icon: <SvgPercent />,
      label: "ETH Deposit APR",
      value: "8.25%",
    },
    {
      icon: <SvgClock />,
      label: "Loans Value All Time",
      value: "25,056.29 ETH",
      comment: "($40,911,910.31)",
    },
    {
      icon: <SvgLightning />,
      label: "Open Loans",
      value: "1,250",
    },
  ];

  return (
    <section className={cn(style.root)}>
      <div className={cn(style.land)}>
        <div>
          <div className={cn(style.title)}>Be Your Own Bank</div>
          <div className={cn(style.subTitle)}>
            NFT Liquidity <br />
            At Your Own Terms
          </div>
          <div className={cn(style.content)}>
            The most advanced borrowing/lending platform for crypto colletibles
            and non-fungible tokens(NFTs)
          </div>
          <div className={cn(style.buttonBar)}>
            <LinkWithSearchParams to={{ pathname: "/borrow" }}>
              <Button
                variant="blue"
                sx="w-40 h-12 text-[#353D9B] bg-[#D7DDFB] "
              >
                Apply Now
              </Button>
            </LinkWithSearchParams>
          </div>
        </div>
        <img src={Land} alt="land" />
      </div>

      <div className={cn(style.figures)}>
        {figures.map((figure, index) => (
          <div key={index}>
            <span>{figure.value}</span>
            <label>{figure.label}</label>
          </div>
        ))}
      </div>

      <div className={cn(style.states)}>
        {states.map((state, index) => (
          <div key={index} className={cn(style.state)}>
            {state.icon}

            <div className={cn(style.value)}>
              <span className={cn(style.label)}>{state.label}</span>

              <div>
                {state.value}
                <span>{state.comment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={cn(style.carousel)}>
        <div className={cn(style.title)}>Top Collections</div>
        <div className="relative px-16">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <img src={slide1} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide2} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide3} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide4} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide5} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide6} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide7} alt="slide1" className="w-full" />
            </div>
          </div>
          {loaded && instanceRef.current && (
            <>
              <div
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                className={cn(style.arrow, style.Left)}
              >
                <SvgArrowRight />
              </div>

              <div
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                className={cn(style.arrow, style.Right)}
              >
                <SvgArrowLeft />
              </div>
            </>
          )}
          {loaded && instanceRef.current && (
            <div className={cn(style.dots)}>
              {[
                ...(Array(
                  instanceRef.current.track.details.slides.length
                ).keys() as any),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={cn(
                      style.dot,
                      currentSlide === idx ? style.active : ""
                    )}
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
