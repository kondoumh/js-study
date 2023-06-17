<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[50, 50, 50]" />
      <OrbitControls />
      <Suspense>
        <GLTFModel path="models/teapot.gltf" draco />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
    </TresCanvas>
</template>
