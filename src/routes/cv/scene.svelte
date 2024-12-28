<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid, OrbitControls, TransformControls } from '@threlte/extras';
  import * as Three from 'three';
  import { MathUtils } from 'three';

  const DEG2RAD = MathUtils.DEG2RAD;

    let ref;
</script>

<!-- Grid -->
<Grid cellColor="gray" sectionSize={0} />

<!-- Camera -->
<T.PerspectiveCamera position={[20, 20, 20]} fov={50} makeDefault>
  <!-- Controls -->
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight color="white" intensity={0.2} />
<T.DirectionalLight
  color="white"
  intensity={2}
  position={[10, 10, 0]}
  shadow-camera-top={8}
  castShadow
/>

<!-- Sphere -->
<T.Mesh position={[0, 4, 0]} castShadow>
  <T.SphereGeometry args={[4, 64, 64]} />
  <T.MeshStandardMaterial color="white" />
  <TransformControls object={ref} />
</T.Mesh>

<!-- Floor -->
<T.Mesh rotation-x={DEG2RAD * 90} receiveShadow>
  <T.PlaneGeometry args={[20, 20]} />
  <T.MeshStandardMaterial color="white" side={Three.DoubleSide} />
</T.Mesh>
