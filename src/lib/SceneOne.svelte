<script>
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import Laptop from '../components/laptop_materia.svelte';

    export let selectedTechnologies = []; // Icons passed from +page.svelte

    let isMobile = window.innerWidth <= 768;

    $: cameraZ = isMobile ? 15 : 8;
    $: enableZoom = !isMobile;
    $: groupYPosition = isMobile ? 4.5 : 1.5;

    // Optional: Add a listener for window resize to dynamically adjust isMobile
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
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
        maxDistance={20}
        minDistance={7}
        enableZoom={enableZoom}
    />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight intensity={2} position={[5, 5, 5]} />

<!-- Add the Laptop Model with selected icons -->
<T.Group position={[0, groupYPosition, 0]} scale={5}>
    <Laptop castShadow receiveShadow technologies={selectedTechnologies} />
</T.Group>
