/* eslint-disable no-param-reassign */
import React, {
  useEffect, useRef,
} from 'react';
import styles from './style.module.scss';

const Confetti = (props) => {
  const { confetti, setConfetti } = props;
  const confettiCanvas = useRef(null);
  let canvas; let ctx;

  const confettiGroup = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 3;
  const drag = 0.075;
  const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const randomRange = (min, max) => Math.random() * (max - min) + min;

  const initConfetti = () => {
    canvas = confettiCanvas.current;
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < confettiCount; i += 1) {
      confettiGroup.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(5, 15),
          y: randomRange(10, 20),
        },
        position: {
          x: randomRange(0, canvas.width),
          y: randomRange(0, canvas.height - 1),
        },
        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },
        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50),
        },
      });
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiGroup.forEach((confetto, index) => {
      const width = confetto.dimensions.x * confetto.scale.x;
      const height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
      confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetti when out of frame
      if (confetto.position.y >= canvas.height) confettiGroup.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.05);
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetti
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
    window.requestAnimationFrame(render);
  };

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  useEffect(() => {
    if (confetti !== 0) {
      initConfetti();
      render();
      setTimeout(() => { setConfetti(0); }, 2500);
    }
  }, [confetti]);

  return (
    <>
      <canvas className={styles['confetti-page']} ref={confettiCanvas} />
    </>
  );
};

export default Confetti;
