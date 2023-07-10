<script lang='ts'>
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { IFCLoader } from 'web-ifc-three/IFCLoader';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

    let w: number;
    let h: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let ifcLoader: IFCLoader;

    onMount(async() => {
        setupThree();
        await setupLoader();
        animate();
        await loadIFC();
    })

    function setupThree() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, (w/h), 0.1, 1000);
        camera.position.set(15, 10, 8);

        const lightColor = 0xffeeff;
        const directionalLight = new THREE.DirectionalLight(lightColor, 1);
        directionalLight.position.set(0, 10, 0);
        directionalLight.target.position.set(-5, 0, 0);
        scene.add(directionalLight);
        scene.add(directionalLight.target);
        scene.add(new THREE.AmbientLight(lightColor, 0.5));

        const threeCanvas = <HTMLCanvasElement> document.getElementById('viewer-canvas');
        renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, alpha: true, antialias: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        scene.add(new THREE.GridHelper(50, 30));

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(-2, 0, 0);
    }

    async function setupLoader() {
        ifcLoader = new IFCLoader();
        await ifcLoader.ifcManager.applyWebIfcConfig({
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: true,
        });
        await ifcLoader.ifcManager.setWasmPath('/');
    }

    async function loadIFC() {
        const url = '/example.ifc';
        ifcLoader.load(url, async (ifcModel) => {
            scene.add(ifcModel);
            ifcModel.translateY(0.5);
            ifcModel.updateMatrixWorld(true);
        });
    }

    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    function onResize() {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
</script>

<canvas id='viewer-canvas' bind:clientWidth={w} bind:clientHeight={h} class='w-full h-full'></canvas>
<svelte:window on:resize={onResize} />