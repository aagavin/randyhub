export const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vPos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPos;

  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    float time = uTime * 0.8;
    vec2 repeat = -vec2(5., 3.);
    // To repeat the uvs we need to multiply them by a scalar
    // and then get the fractional part of it so they from 0 to 1
    // To move them continuously we have to add time
    // to the x or y component, to change the direction
    vec2 uv = fract(vUv * repeat - vec2(0., time)); // The sign of time change direction of movement

    // Fake shadow
    float shadow = clamp(vPos.z / 8., 0., 1.);
    // float shadow = 1.;

    vec3 texture = texture2D(uTexture, uv).rgb;
    texture *= vec3(uv.x, uv.y, 1.); // To help visualize the repeated uvs

    gl_FragColor = vec4(texture * shadow, 1.);
  }
`;
