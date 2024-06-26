import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import jeans1 from "../../assets/pattern/jeans1.jpg";
import jeans2 from "../../assets/pattern/jeans2.jpg";
import jeans3 from "../../assets/pattern/jeans3.jpg";
import jeans4 from "../../assets/pattern/jeans4.jpg";
import a from "../../assets/pattern/a.png";
import jeans2glb from "../../assets/jeans.glb";
import { Spinner } from "@material-tailwind/react";
import './Home.css'

function JeansViewer() {
  const canvasRef = useRef();
  const [texture, setTexture] = useState(jeans3);
  let model = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(5, 5, 5);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#ffffff"));

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(3, 3, 6);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 10, 10);
    scene.add(spotLight);

    const loader = new GLTFLoader();
    loader.load(
      jeans2glb,
      (glb) => {
        model.current = glb.scene;
        model.current.scale.set(1, 1, 1);
        model.current.traverse((child) => {
          if (
            child.isMesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            const defaultTexture = new THREE.TextureLoader().load(jeans3);
            child.material.map = defaultTexture;
            child.material.side = THREE.DoubleSide;
          }
        });

        const box = new THREE.Box3().setFromObject(model.current);
        const center = box.getCenter(new THREE.Vector3());
        model.current.position.sub(center);
        scene.add(model.current);

        const boundingBox = new THREE.Box3().setFromObject(model.current);
        const boundingBoxCenter = boundingBox.getCenter(new THREE.Vector3());
        const boundingBoxSize = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(
          boundingBoxSize.x,
          boundingBoxSize.y,
          boundingBoxSize.z
        );

        camera.position.copy(boundingBoxCenter);
        camera.position.z += maxDimension * 2;

        controls.target.copy(boundingBoxCenter);
        controls.update();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading 3D model", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    window.addEventListener("resize", () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const newTexture = textureLoader.load(texture, (loadedTexture) => {
      loadedTexture.minFilter = THREE.LinearFilter;
      loadedTexture.magFilter = THREE.LinearFilter;
      loadedTexture.generateMipmaps = false;
    });

    if (model.current) {
      model.current.traverse((child) => {
        if (
          child.isMesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.map = newTexture;
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture]);

  return (
    <div className="model_3d">
      <div className="flex items-center justify-center md:-mt-12">
        <section className="md:flex md:justify-center hidden">
          <div>
            {[jeans3, jeans1, jeans2, jeans4, a].map((pattern) => (
              <div
                key={pattern}
                className="patternOption rounded overflow-hidden mb-4"
                data-texture={pattern}
                onClick={() => setTexture(pattern)}
              >
                <img src={pattern} alt={pattern} />
              </div>
            ))}
          </div>
        </section>
        <section className="canvas_section flex-grow">
          <canvas ref={canvasRef} className="webgl"></canvas>
        </section>
      </div>

      {/* Mobile view */}
      <section className=" md:hidden">
        <div className="flex justify-center">
          {[jeans3, jeans1, jeans2, jeans4, a].map((pattern) => (
            <div
              key={pattern}
              className="patternOption rounded overflow-hidden mb-4"
              data-texture={pattern}
              onClick={() => setTexture(pattern)}
            >
              <img src={pattern} alt={pattern} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default JeansViewer;
