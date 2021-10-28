/* eslint-disable no-underscore-dangle */
import {
  TweenLite, gsap,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import sampleImage from '../../assets/mashedpotatoes.jpg';

import './style.scss';

class CustomCursor extends PureComponent {
  constructor(props) {
    super(props);
    this.moveCircle = this.moveCircle.bind(this);
    this.hoverFunc = this.hoverFunc.bind(this);
    this.unhoverFunc = this.unhoverFunc.bind(this);
    this.hideFollow = this.hideFollow.bind(this);
    this.showFollow = this.showFollow.bind(this);
    this.setScaleAndRotation = this.setScaleAndRotation.bind(this);
    this.circleTween = null;
    this.followTween = null;
    this.transformRegex = /translate3d\((?<xPos>[\d.-]+)px, (?<yPos>[\d.-]+)px, (?<zPos>[\d.-]+)px\)/gm;
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.moveCircle);
    // window.addEventListener('scroll', this.onScroll);
    // window.addEventListener('onmouseover', this.hoverFunc);
    // window.addEventListener('onmouseout', this.unhoverFunc);
  }

  onScroll(event) {
    if (this.circle) {
      TweenLite.to(this.circle, 0.2, {
        x: event.x,
        y: event.y,
      });
    }
    if (this.follow) {
      TweenLite.to(this.follow, 0.7, {
        x: event.x,
        y: event.y,
      });
    }
  }

  setScaleAndRotation(event) {
    const target = this.follow.getBoundingClientRect();
    const centerX = target.x + target.width / 2;
    const centerY = target.y + target.height / 2;
    const scale = Math.sqrt(((event.y - centerY) ** 2) + ((event.x - centerX) ** 2)) * 0.01;

    gsap.set(this.follow, {
      rotation: Math.atan2(
        (event.y - centerY),
        (event.x - centerX),
      ) * (180 / Math.PI) + 90,
      scale,
    });
  }

  moveCircle(event) {
    if (event) {
      if (this.circle) {
        TweenLite.to(this.circle, 0.2, {
          x: event.x,
          y: event.y,
          z: 0.1,
        });
      }
      if (this.follow) {
        gsap.to(this.follow, 2.0, {
          x: event.x,
          y: event.y,
          z: 0.1,
          onUpdate: this.setScaleAndRotation,
          onUpdateParams: [event],
        });
      }
    }
  }

  hoverFunc() {
    if (this.circle) {
      TweenLite.to(this.circle, 0.3, {
        opacity: 1,
        scale: 0,
      });
    }
    if (this.follow) {
      TweenLite.to(this.follow, 0.3, {
        scale: 2,
      });
    }
  }

  hideFollow() {
    if (this.circle) {
      TweenLite.to(this.circle, 0.3, {
        opacity: 1,
        scale: 1,
      });
    }
    if (this.follow) {
      TweenLite.to(this.follow, 0.3, {
        scale: 0,
      });
    }
  }

  showFollow() {
    if (this.follow) {
      TweenLite.to(this.follow, 0.3, {
        scale: 1,
      });
    }
  }

  unhoverFunc() {
    if (this.circle) {
      TweenLite.to(this.circle, 0.3, {
        opacity: 1,
        scale: 1,
      });
    }
    if (this.follow) {
      TweenLite.to(this.follow, 0.3, {
        scale: 1,
      });
    }
  }

  render() {
    return (
      <div className="cursor">
        <div
          className="cursor-circle"
          ref={(ref) => {
            this.circle = ref;
          }}
        />
        <img
          src={sampleImage}
          alt="Img"
          className="cursor-circle-follow"
          ref={(ref) => {
            this.follow = ref;
          }}
        />
        <div
          className="cursor-circle-name"
          ref={(ref) => {
            this.list = ref;
          }}
        />
      </div>
    );
  }
}

export default CustomCursor;
