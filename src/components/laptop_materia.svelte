<script>
    import { goto } from "$app/navigation";
    import { T } from "@threlte/core";
    import { useGltf, interactivity, useCursor, Text } from "@threlte/extras";
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { log } from "three/tsl";

    let {
        technologies,
        fallback,
        error,
        children,
        ref = $bindable(),
        ...props
    } = $props();

    const gltf = useGltf("assets/laptop_materia.glb");

    const rootPosition = [0, -1, 0.6];
    const rootRotation = [0.6, 0, 0];

    // Counteract position of root group to keep icon group centered
    const iconGroupInverseRotation = rootRotation.map((v) => -v); // Inverse rotation to counteract root group
    const iconGroupCounterPosition = rootPosition.map((v) => -v);

    let isHovering = $state(false); // State to show/hide hover text
    let hoverText = $state(""); // Text to show when hovering over an icon

    let iconMeshes = $state([]); // This will hold the generated icon meshes

    interactivity(); // Enable interactivity

    // Function to create icon meshes
    const createIconMeshes = (screengeometry) => {
        let tmpIconMeshes = [];
        const iconSize = 0.2; // Size of each icon
        const iconsPerRow = 5; // Number of icons per row
        const spacing = iconSize + 0.1; // Spacing between icons

        // Calculate offsets to center icons
        const totalWidth = iconsPerRow * spacing - spacing; // Total width of icons
        const totalHeight =
            Math.ceil(technologies.length / iconsPerRow) * spacing - spacing; // Total height of icons

        technologies.forEach((technology, index) => {
            const row = Math.floor(index / iconsPerRow);
            const column = index % iconsPerRow;

            // Calculate the icon's position relative to (0, 0, 0)
            const x = column * spacing - totalWidth / 2;
            const y = totalHeight / 2 - row * spacing;
            const z = -0.6; // Slightly in front of the screen plane

            const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.icon.split("-")[1]}/${technology.icon.split("-")[1]}-original.svg`;

            const iconTexture = new THREE.TextureLoader().load(iconUrl);
            const iconMaterial = new THREE.MeshBasicMaterial({
                map: iconTexture,
                transparent: true,
            });

            const iconGeometry = new THREE.PlaneGeometry(iconSize, iconSize);

            tmpIconMeshes.push({
                id: `icon-${index}`,
                name: technology.name,
                position: [x, y, z],
                geometry: iconGeometry,
                material: iconMaterial,
            });
        });
        return tmpIconMeshes;
    };

    const { onPointerEnter, onPointerLeave } = useCursor();

    const handlePointerEnter = (iconName) => {
        hoverText = iconName; // Set hover text to the icon's name
        isHovering = true; // Show the text
        onPointerEnter();
    };

    const handlePointerLeave = () => {
        isHovering = false; // Hide the text
        onPointerLeave();
    };

    const handlePointerClick = (technologyName) => {
        // Navigate to the /projects/ route with the technology as a query parameter
        goto(`/projects?technology=${encodeURIComponent(technologyName)}`);
    };

    // Create an emissive material for the screen
    const screenMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0x000000), // White light emission
        emissiveIntensity: 5, // Adjust intensity for brightness
        color: 0x444444, // Base color for contrast
    });

    // Use onMount lifecycle method to load the GLTF and create icon meshes
    onMount(async () => {
        // Wait for the GLTF model to load
        let loadedGltf = await gltf;
        iconMeshes = createIconMeshes(loadedGltf.nodes.Object_34.geometry);
        handlePointerEnter(iconMeshes[0].name)
        setTimeout(handlePointerLeave, 10)
    });
</script>

<T.Group bind:ref dispose={false} {...props}>
    {#await gltf}
        {@render fallback?.()}
    {:then gltf}
        <!-- Root group calibrated to position laptop screen center at (0, 0, 0) -->
        <T.Group position={rootPosition} rotation={rootRotation}>
            <T.Group position={[0, 0.5, -1.02]} rotation={[-2.17, 0, 0]}>
                <T.Mesh
                    geometry={gltf.nodes.Object_33.geometry}
                    material={gltf.materials.Black_Dark}
                />
                <!-- Apply the black square material with icons to Object_34 -->
                <T.Mesh
                    geometry={gltf.nodes.Object_34.geometry}
                    material={screenMaterial}
                />
            </T.Group>

            <!-- Icon meshes group counteracting root position and rotation -->
            <T.Group
                position={iconGroupCounterPosition}
                rotation={iconGroupInverseRotation}
            >
                {#if iconMeshes.length > 0}
                    {#each iconMeshes as { id, position, geometry, material, name } (id)}
                        <T.Mesh
                            {position}
                            {geometry}
                            {material}
                            onpointerenter={() => {
                                handlePointerEnter(name);
                            }}
                            onpointerleave={() => {
                                handlePointerLeave();
                            }}
                            onpointerdown={() => handlePointerClick(name)}
                        />
                    {/each}
                {/if}
                <!-- Hover text -->
                {#if isHovering}
                    <Text
                        position={[0, 0.6, -0.6]}
                        fontSize={0.2}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        text={hoverText}
                    >
                        {hoverText}
                    </Text>
                {/if}
            </T.Group>

            <T.Mesh
                geometry={gltf.nodes.Object_23.geometry}
                material={gltf.materials.Black_Dark}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_24.geometry}
                material={gltf.materials.White}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_25.geometry}
                material={gltf.materials.White}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_26.geometry}
                material={gltf.materials.White}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_27.geometry}
                material={gltf.materials.White}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_29.geometry}
                material={gltf.materials[".Example_Sheet_033.001"]}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_31.geometry}
                material={gltf.materials[".Example_Sheet_033.001"]}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_36.geometry}
                material={gltf.materials.Black_Dark}
                position={[0.96, 0.06, -0.68]}
                rotation={[-2.17, 0, 0]}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_38.geometry}
                material={gltf.materials.Black_Dark}
                position={[0.96, 0.98, -1.31]}
                rotation={[-2.17, 0, 0]}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_40.geometry}
                material={gltf.materials.Black_Dark}
                position={[-0.95, 0.98, -1.31]}
                rotation={[-2.17, 0, 0]}
            />
            <T.Mesh
                geometry={gltf.nodes.Object_42.geometry}
                material={gltf.materials.Black_Dark}
                position={[-0.95, 0.06, -0.68]}
                rotation={[-2.17, 0, 0]}
            />
        </T.Group>
    {:catch err}
        {@render error?.({ error: err })}
    {/await}

    {@render children?.({ ref })}
</T.Group>
