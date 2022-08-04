import React, {
  useEffect, useRef,
} from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderTarget, Color, TextureLoader,
  RawShaderMaterial, DoubleSide, Mesh,
  WebGL1Renderer, Clock, PlaneBufferGeometry, ShaderMaterial,
} from 'three';
import loadFont from 'load-bmfont';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';
import {
  OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';
import fontFile from '../assets/Orbulon-Black.fnt';
import fontAtlas from '../assets/Orbulon-Black.png';
import {
  fragmentShader, vertexShader,
} from './shader';

const WaterfallType = () => {
  // Reference: https://tympanus.net/codrops/2020/06/02/kinetic-typography-with-three-js/

  let renderer;
  let camera;
  let scene;
  let clock;
  let fontGeometry;
  let loader;
  let fontMaterial;
  let rt;
  let rtCamera;
  let rtScene;
  let text;
  let geometry;
  let material;
  let mesh;
  let controls;

  const mount = useRef(null);

  const createRenderTarget = () => {
    // Render Target setup
    rt = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
    );
    rtCamera = new PerspectiveCamera(45, 1, 0.1, 1000);
    rtCamera.position.z = 6;

    rtScene = new Scene();
    rtScene.background = new Color('#000000');

    // Create text mesh with font geometry and material
    text = new Mesh(fontGeometry, fontMaterial);

    // Adjust dimensions
    text.position.set(0.965, 0.275, 0.3);
    text.rotation.set(Math.PI / 4, Math.PI, 0);
    text.scale.set(0.005, 0.03, 5);

    // Add text mesh to buffer scene
    rtScene.add(text);
  };

  const createMesh = () => {
    geometry = new PlaneBufferGeometry(240, 60, 16, 14);
    material = new ShaderMaterial({
      fragmentShader,
      uniforms: {
        uTexture: { value: rt.texture },
        uTime: { value: 0 },
      },
      vertexShader,
    });

    mesh = new Mesh(geometry, material);

    const peak = 10;
    const vertices = mesh.geometry.attributes.position.array;
    for (let index = 0; index <= vertices.length; index += 3) {
      vertices[index + 2] = peak * Math.random();
    }
    mesh.geometry.attributes.position.array = vertices;

    scene.add(mesh);
  };

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const renderAnimation = () => {
    controls.update();

    // Update time
    material.uniforms.uTime.value = clock.getElapsedTime();

    // Draw Render Target
    renderer.setRenderTarget(rt);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    renderer.render(scene, camera);
  };

  const animate = () => {
    requestAnimationFrame(animate.bind(this));
    renderAnimation();
  };

  const addEvents = () => {
    window.addEventListener('resize', resize.bind(this));
  };

  // Create Scene + Camera
  const init = () => {
    camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );

    camera.position.z = 60;
    camera.position.y = -80;
    scene = new Scene();
    clock = new Clock();

    renderer = new WebGL1Renderer({
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    mount.current.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);

    // Create geometry of packed glyphs
    loadFont(fontFile, (_err, font) => {
      fontGeometry = createGeometry({
        font,
        text: 'CONDENSED MILK',
      });

      // Load texture containing font glyps
      loader = new TextureLoader();
      loader.load(fontAtlas, (texture) => {
        fontMaterial = new RawShaderMaterial(
          MSDFShader({
            color: 0xffffff,
            map: texture,
            negate: false,
            side: DoubleSide,
            transparent: true,
          }),
        );

        createRenderTarget();
        createMesh();
        animate();
        addEvents();
      });
    });
  };

  useEffect(() => {
    if (!scene) {
      init();
    }
  }, []);

  return (
    <div id="waterfall" ref={mount} />
  );
};

export default WaterfallType;
