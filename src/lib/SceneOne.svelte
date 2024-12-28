<script>
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import Laptop from '../components/laptop_materia.svelte';
  
    export let selectedIcons = []; // Icons passed from +page.svelte
  </script>
  
  <T.PerspectiveCamera
      makeDefault
      position={[0, 0, 10]}
      fov={80}
      near={0.1}
      far={1000}
  >
      <OrbitControls
          allowPan={false}
          enableDamping
          maxDistance={300}
          minDistance={1}
      />
  </T.PerspectiveCamera>
  
  <T.AmbientLight intensity={0.2} />
  <T.DirectionalLight position={[10, 5, 0]} />
  
  <!-- Add the Laptop Model with selected icons -->
  <T.Group position={[0, -10, 0]} scale={5}>
      <Laptop castShadow receiveShadow icons={selectedIcons} />
  </T.Group>
  