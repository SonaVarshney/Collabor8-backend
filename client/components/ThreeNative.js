import React, { useEffect } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import ExplosionConfetti from './Confetti'; // Adjust path if needed

const ThreeNative = () => {
  const setupScene = async (gl) => {
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Add lights (optional, depending on your scene)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add ExplosionConfetti to the scene
    const explosion = new ExplosionConfetti({
      isExploding: true,
      radius: 10,
      amount: 50,
    });
    scene.add(explosion);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={(gl) => setupScene(gl)}
    />
  );
};

export default ThreeNative;
