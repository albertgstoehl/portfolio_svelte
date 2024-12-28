<script>
    import { T } from "@threlte/core";
    import { useGltf, interactivity, useCursor, Text } from "@threlte/extras";
    import * as THREE from "three";

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

    // Generate icon meshes dynamically
    let iconMeshes = [];

    interactivity(); // Enable interactivity

    // Function to create icon meshes
    const createIconMeshes = (screengeometry) => {
        const iconMeshes = [];

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

            iconMeshes.push({
                id: `icon-${index}`,
                name: technology.name,
                position: [x, y, z],
                geometry: iconGeometry,
                material: iconMaterial,
            });
        });
        return iconMeshes;
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
</script>

<T.Group bind:ref dispose={false} {...props}>
    <T.AxesHelper args={[5]} />
    {#await gltf}
        {@render fallback?.()}
    {:then gltf}
        {(iconMeshes = createIconMeshes(gltf.nodes.Object_34.geometry))}
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
                    material={gltf.materials.White}
                />
            </T.Group>

            <!-- Icon meshes group counteracting root position and rotation -->
            <T.Group
                position={iconGroupCounterPosition}
                rotation={iconGroupInverseRotation}
            >
                {#each iconMeshes as { id, position, geometry, material, name } (id)}
                    <T.Mesh
                        {position}
                        {geometry}
                        {material}
                        onpointerenter={() => {
                            handlePointerEnter(name);
                            onPointerEnter();
                        }}
                        onpointerleave={() => {
                            handlePointerLeave();
                            onPointerLeave();
                        }}
                    />
                {/each}
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
