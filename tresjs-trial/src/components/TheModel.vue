<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { reactive, shallowRef } from 'vue';
import { OrbitControls, GLTFModel, useTweakPane } from '@tresjs/cientos';

const state = reactive({
  clearColor: 'black',
  shadows: true,
  alpha: false,
});

const { onLoop } = useRenderLoop();

const groupRef = shallowRef(null);

onLoop(({ elapsed }) => {
  if(groupRef) {
     groupRef.value.rotation.y = elapsed;
  }
});

useTweakPane();
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[70, 20, 50]" />
    <OrbitControls />
    <TresGroup ref="groupRef" >
      <Suspense>
        <GLTFModel path="models/teapot.gltf" draco />
      </Suspense>
    </TresGroup>
    <TresDirectionalLight :position="[-2, 15, 9]" :intensity="8.5" cast-shadow />
  </TresCanvas>
</template>
