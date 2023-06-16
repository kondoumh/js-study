<script setup lang="ts">
import { ref } from 'vue';
import { Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useLoader } from '@tresjs/core';
import { OrbitControls, GLTFModel } from '@tresjs/cientos';

const bgColor = new Color('#aba7a7');

const meshPosition = [0, 3, 0];

const lightRef = ref(null);

const { scene } = await useLoader(
  GLTFLoader,
  'https://raw.githubusercontent.com/KhronosGroup/Vulkan-Samples-Assets/main/scenes/teapot.gltf'
);

</script>

<template>
  <Suspense>
    <TresCanvas
      :clear-color="bgColor"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      preserve-drawing-buffer
    >
      <OrbitControls />
      <TresPerspectiveCamera
        :position="[40, 40, 40]"
        :fov="75"
        :near="0.1"
        :far="1000"
      />
      <TresScene :fog="bgColor">
        <TresMesh v-bind="scene" />
        <TresDirectionalLight
          ref="lightRef"
          :position="[2, 0, 0]"
          :intensity="1.5"
          :look-at="akuAkuRef"
        />
        <TresDirectionalLightHelper v-if="false" :args="[lightRef, 5]" />
        <TresAxesHelper />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
