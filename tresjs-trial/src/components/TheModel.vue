<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { shallowRef } from 'vue'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const modelRef = shallowRef<THREE.Object3D>()

const { onLoop } = useRenderLoop()

const groupRef = shallowRef(null)

onLoop(({ elapsed }) => {
  if(groupRef) {
     groupRef.value.rotation.y = elapsed
  }
})
</script>

<template>
  <TresCanvas clear-color="#000000" shadows alpha>
    <TresPerspectiveCamera :position="[70, 20, 50]" />
    <OrbitControls />
    <TresGroup ref="groupRef" >
      <Suspense>
        <GLTFModel path="models/teapot.gltf" draco />
      </Suspense>
    </TresGroup>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="8.5" cast-shadow />
  </TresCanvas>
</template>
