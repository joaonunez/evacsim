import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";

const Simulacion3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, 1.5, 0.1, 1000);
    camera.position.set(0, 5, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Mundo físico
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const stickGeometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    const sticks: THREE.Mesh[] = [];
    const bodies: CANNON.Body[] = [];

    const addStick = (x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(stickGeometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      sticks.push(mesh);

      const shape = new CANNON.Box(new CANNON.Vec3(0.1, 1.5, 0.1));
      const body = new CANNON.Body({ mass: 0.5 });
      body.addShape(shape);
      body.position.set(x, y, z);
      world.addBody(body);
      bodies.push(body);
    };

    // Pilares verticales
    addStick(-1, 1.5, -1);
    addStick(1, 1.5, -1);
    addStick(-1, 1.5, 1);
    addStick(1, 1.5, 1);

    // Palos horizontales (techo y base)
    const horizontalStick = new THREE.BoxGeometry(2.2, 0.2, 0.2);
    const addHStick = (x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(horizontalStick, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      const shape = new CANNON.Box(new CANNON.Vec3(1.1, 0.1, 0.1));
      const body = new CANNON.Body({ mass: 0.3 });
      body.addShape(shape);
      body.position.set(x, y, z);
      world.addBody(body);

      sticks.push(mesh);
      bodies.push(body);
    };

    addHStick(0, 0.1, -1);
    addHStick(0, 0.1, 1);
    addHStick(0, 3, -1);
    addHStick(0, 3, 1);

    // Bola para derrumbar
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const sphereBody = new CANNON.Body({
      mass: 3,
      shape: new CANNON.Sphere(0.5),
    });
    sphereBody.position.set(-5, 3, 0);
    sphereBody.velocity.set(5, 0, 0);
    world.addBody(sphereBody);

    // Suelo
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Animación
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      world.step(1 / 60, delta, 3);

      sticks.forEach((m, i) => {
        m.position.copy(bodies[i].position as any);
        m.quaternion.copy(bodies[i].quaternion as any);
      });

      sphere.position.copy(sphereBody.position as any);
      sphere.quaternion.copy(sphereBody.quaternion as any);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="mx-auto mt-8 border shadow-md rounded" />;
};

export default Simulacion3D;
