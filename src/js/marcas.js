$(".trademarks-layout__slider").slick({
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  responsive: [
    {
      breakpoint: 801,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});
