<script>
    import { T } from '@threlte/core';
    import { useGltf } from '@threlte/extras';
    import * as THREE from 'three';
  
    let {
        icons,
        fallback,
        error,
        children,
        ref = $bindable(),
        ...props
    } = $props();
  
    const gltf = useGltf('assets/laptop_materia.glb');

    // Constants for canvas size
    const CANVAS_WIDTH = 1920;
    const CANVAS_HEIGHT = 1080;
  
    // Function to create a black square texture with all icons
    const createBlackSquareMaterial = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        // Set canvas size
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
  
        // Fill the calibrated rectangle (representing the screen)
        context.fillStyle = 'white';
        const rectX = 270; // Adjusted X position
        const rectY = 290; // Adjusted Y position
        const rectWidth = 425;
        const rectHeight = 225;

        context.fillRect(rectX, rectY, rectWidth, rectHeight);
  
        // Enhance contrast by applying a shadow effect for icons
        context.shadowColor = 'rgba(0, 0, 0, 1)';
        context.shadowBlur = 10;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
  
        // Apply filters for color enhancement
        context.filter = 'brightness(1) saturate(4)';
  
        // Calculate icon size and positioning
        const iconSize = rectHeight / 4; // Fit icons within rectangle height
        const iconsPerRow = Math.floor(rectWidth / (iconSize + 20));
        const totalRows = Math.ceil(icons.length / iconsPerRow);

        // Start positioning icons row by row
        icons.forEach((iconName, index) => {
            const row = Math.floor(index / iconsPerRow);
            const column = index % iconsPerRow;
            const x = rectX + column * (iconSize + 20);
            const y = rectY + row * (iconSize + 20);
            const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName.split('-')[1]}/${iconName.split('-')[1]}-original.svg`;
            const icon = new Image();
            icon.crossOrigin = 'anonymous'; // Prevent CORS issues
            icon.src = iconUrl;
            icon.onload = () => {
                context.drawImage(icon, x, y, iconSize, iconSize);
                texture.needsUpdate = true;
            };
            // Add event listener for icon click
            canvas.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;

                // Check if the click is within the icon's bounds
                if (
                    clickX >= x &&
                    clickX <= x + iconSize &&
                    clickY >= y &&
                    clickY <= y + iconSize
                ) {
                    console.log(`Icon clicked: ${iconName}`);
                }
            });
        });
  
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
  
        return new THREE.MeshBasicMaterial({ map: texture });
    };
  
    const blackDarkMaterial = createBlackSquareMaterial();
  </script>
  
  <T.Group bind:ref dispose={false} {...props}>
    {#await gltf}
        {@render fallback?.()}
    {:then gltf}
        <T.Group position={[-0.19, 1.1, -0.19]} rotation={[0.84, -0.44, 0.15]}>
            <T.Group position={[0, 0.5, -1.02]} rotation={[-2.17, 0, 0]}>
                <T.Mesh geometry={gltf.nodes.Object_33.geometry} material={gltf.materials.Black_Dark} />
                <!-- Apply the black square material with icons to Object_34 -->
                <T.Mesh geometry={gltf.nodes.Object_34.geometry} material={blackDarkMaterial} />
            </T.Group>
            <T.Mesh geometry={gltf.nodes.Object_23.geometry} material={gltf.materials.Black_Dark} />
            <T.Mesh geometry={gltf.nodes.Object_24.geometry} material={gltf.materials.White} />
            <T.Mesh geometry={gltf.nodes.Object_25.geometry} material={gltf.materials.White} />
            <T.Mesh geometry={gltf.nodes.Object_26.geometry} material={gltf.materials.White} />
            <T.Mesh geometry={gltf.nodes.Object_27.geometry} material={gltf.materials.White} />
            <T.Mesh geometry={gltf.nodes.Object_29.geometry} material={gltf.materials['.Example_Sheet_033.001']} />
            <T.Mesh geometry={gltf.nodes.Object_31.geometry} material={gltf.materials['.Example_Sheet_033.001']} />
            <T.Mesh geometry={gltf.nodes.Object_36.geometry} material={gltf.materials.Black_Dark} position={[0.96, 0.06, -0.68]} rotation={[-2.17, 0, 0]} />
            <T.Mesh geometry={gltf.nodes.Object_38.geometry} material={gltf.materials.Black_Dark} position={[0.96, 0.98, -1.31]} rotation={[-2.17, 0, 0]} />
            <T.Mesh geometry={gltf.nodes.Object_40.geometry} material={gltf.materials.Black_Dark} position={[-0.95, 0.98, -1.31]} rotation={[-2.17, 0, 0]} />
            <T.Mesh geometry={gltf.nodes.Object_42.geometry} material={gltf.materials.Black_Dark} position={[-0.95, 0.06, -0.68]} rotation={[-2.17, 0, 0]} />
        </T.Group>
    {:catch err}
        {@render error?.({ error: err })}
    {/await}
  
    {@render children?.({ ref })}
  </T.Group>