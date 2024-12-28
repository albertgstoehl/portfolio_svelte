<script>
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import Laptop from '../components/laptop_materia.svelte';

    export let selectedIcons = []; // Icons passed from +page.svelte

    let isMobile = window.innerWidth <= 768;

    $: cameraZ = isMobile ? 30 : 8;
    $: enableZoom = !isMobile;
</script>

<T.PerspectiveCamera
    makeDefault
    position={[0, 0, cameraZ]}
    fov={80}
    near={0.1}
    far={1000}
>
    <OrbitControls
        allowPan={false}
        enableDamping
        maxDistance={300}
        minDistance={1}
        enableZoom={enableZoom}
    />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[10, 5, 0]} />

<!-- Add the Laptop Model with selected icons -->
<T.Group position={[0, -7, 0]} scale={5}>
    <Laptop castShadow receiveShadow icons={selectedIcons} />
</T.Group>
