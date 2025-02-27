import { useEffect, useRef } from 'react';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';

const CustomersReviews = () => {
  const sliderRef = useRef(null);
  const keenSliderInstance = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      keenSliderInstance.current = new KeenSlider(sliderRef.current, {
        loop: true,
        slides: {
          origin: 'center',
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          '(min-width: 1024px)': {
            slides: {
              origin: 'auto',
              perView: 2.5,
              spacing: 32,
            },
          },
        },
      });
    }

    return () => {
      keenSliderInstance.current?.destroy();
    };
  }, []);

  return (
    <section className="">
      <div className="mx-auto max-w-[1340px] px-4 pb-5 ">
        <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
          <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
            Service Cleaning trusted reviews from our customers
          </h2>

          <div className="mt-8 flex gap-4 lg:mt-0">
            <button
              aria-label="Previous slide"
              onClick={() => keenSliderInstance.current?.prev()}
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              ◀
            </button>

            <button
              aria-label="Next slide"
              onClick={() => keenSliderInstance.current?.next()}
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide  p-6 shadow-xs">
              <div className="mt-4">
                <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                  Sparkling
                </p>

                <p className="mt-4 leading-relaxed ">
                  Create a healthier and more organized workspace with our
                  professional office cleaning. We handle desks, floors, and
                  common areas for a fresh work environmen
                </p>
              </div>
              <footer className="mt-4 text-sm font-medium sm:mt-6">
                &mdash; Alive
              </footer>
            </div>
            <div className="keen-slider__slide  p-6 shadow-xs">
              <div className="mt-4">
                <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                  Deep Clean
                </p>

                <p className="mt-4 leading-relaxed ">
                  , Fresh Feel! Say goodbye to dust, stains, and odors! Our
                  expert cleaning revives your carpets and furniture, leaving
                  them soft, fresh, and allergen-free.
                </p>
              </div>
              <footer className="mt-4 text-sm font-medium  sm:mt-6">
                &mdash; Ensure Scott
              </footer>
            </div>
            <div className="keen-slider__slide  p-6 shadow-xs">
              <div className="mt-4">
                <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                  Stayin' Alive
                </p>

                <p className="mt-4 leading-relaxed ">
                  Keep your home fresh and spotless with our deep cleaning
                  services. From kitchens to bedrooms, we ensure a germ-free and
                  tidy space for you and your family.
                </p>
              </div>
              <footer className="mt-4 text-sm font-medium  sm:mt-6">
                &mdash; Michael Scott
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomersReviews;
