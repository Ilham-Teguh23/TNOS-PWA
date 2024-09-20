import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import welcome from "../../assets/images/welcome.png";

export class SliderWelcomePage extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  previous = () => {
    this.slider.current.slickPrev();
  };
  next = () => {
    this.slider.current.slickNext();
  };

  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 3000,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Fragment>
        <div className="responsive-class">
          <div className="res-class">
            <div>
              <Slider {...settings}>
                <div>
                  <div className="content-slider">
                    <img width="100%" height="260px" src={welcome} alt="" />
                    <div className="dwad">
                      <h5 className="title-welcome-page text-left mb-1"></h5>
                      <p className="p-welcome-page text-justify">
                        Aplikasi yang buat hidup kamu lebih aman dan nyaman.
                        Selalu siap siaga untuk pendampingan dan konsultasi
                        segala keperluan dan masalah kamu.
                      </p>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SliderWelcomePage;
