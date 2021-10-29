import {
  gsap,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import sampleImage from '../../assets/mashedpotatoes.jpg';
import sampleMouth from '../../assets/coolhead.png';
import './style.scss';

class CustomCursor extends PureComponent {
  constructor(props) {
    super(props);
    this.moveCircle = this.moveCircle.bind(this);
    this.setScaleAndRotation = this.setScaleAndRotation.bind(this);
    this.setMouthScaleAndRotation = this.setMouthScaleAndRotation.bind(this);
    this.toggleSlider = this.toggleSlider.bind(this);
    this.state = {
      cursorToggled: false,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.moveCircle);
    // window.addEventListener('scroll', this.onScroll);
  }

  onScroll(event) {
    if (this.circle) {
      gsap.to(this.circle, 0.1, {
        x: event.x,
        y: event.y,
      });
    }
    if (this.follow) {
      gsap.to(this.follow, 0.7, {
        x: event.x,
        y: event.y,
      });
    }
  }

  setScaleAndRotation(event) {
    if (this.follow) {
      const target = this.follow.getBoundingClientRect();
      const centerX = target.x + target.width / 2;
      const centerY = target.y + target.height / 2;
      const scale = Math.min(
        Math.sqrt(((event.y - centerY) ** 2) + ((event.x - centerX) ** 2)) * 0.002,
        1,
      );
      gsap.set(this.follow, {
        rotation: Math.atan2(
          (event.y - centerY),
          (event.x - centerX),
        ) * (180 / Math.PI) + 90,
        scale,
      });
    }
  }

  setMouthScaleAndRotation(event) {
    if (this.mouth) {
      const target = this.mouth.getBoundingClientRect();
      const centerX = target.x + target.width / 2;
      const centerY = target.y + target.height / 2;
      const scale = Math.min(
        Math.sqrt(((event.y - centerY) ** 2) + ((event.x - centerX) ** 2)) * 0.004,
        1.5,
      );
      gsap.set(this.mouth, {
        rotation: Math.atan2(
          (event.y - centerY),
          (event.x - centerX),
        ) * (180 / Math.PI),
        scale,
      });
    }
  }

  toggleSlider() {
    this.setState((prevState) => ({
      cursorToggled: !prevState.cursorToggled,
    }));
  }

  moveCircle(event) {
    if (event) {
      if (this.circle) {
        gsap.to(this.circle, 0.1, {
          x: event.x,
          y: event.y,
          z: 0.1,
        });
      }
      if (this.follow) {
        gsap.to(this.follow, 1.0, {
          x: event.x,
          y: event.y,
          z: 0.1,
          onUpdate: this.setScaleAndRotation,
          onUpdateParams: [event],
        });
      }
      if (this.mouth) {
        gsap.to(this.mouth, 2.0, {
          x: event.x,
          y: event.y,
          z: 0.1,
          onUpdate: this.setMouthScaleAndRotation,
          onUpdateParams: [event],
        });
      }
    }
  }

  render() {
    const { cursorToggled } = this.state;
    return (
      <>
        <div className="cursor">
          <div
            className={`cursor-circle ${!cursorToggled ? 'disabled' : ''}`}
            ref={(ref) => {
              this.circle = ref;
            }}
          />
          <img
            src={sampleImage}
            alt="Img"
            className={`cursor-circle-follow ${!cursorToggled ? 'disabled' : ''}`}
            ref={(ref) => {
              this.follow = ref;
            }}
          />
          <img
            src={sampleMouth}
            alt="Img"
            className={`cursor-circle-follow ${!cursorToggled ? 'disabled' : ''}`}
            ref={(ref) => {
              this.mouth = ref;
            }}
          />
        </div>
        <div className="toggle-cursor">
          <img className="slider-hint" src={sampleMouth} alt="Click the toggle..." />
          <label htmlFor="slider-checkbox" className="switch">
            <input onClick={this.toggleSlider} id="slider-checkbox" type="checkbox" />
            <span className="slider round" />
          </label>
        </div>
      </>
    );
  }
}

export default CustomCursor;
