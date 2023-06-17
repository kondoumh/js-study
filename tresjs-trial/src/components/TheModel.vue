<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { reactive, shallowRef } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const { onLoop } = useRenderLoop()

const groupRef = shallowRef(null)

onLoop(({ elapsed}) => {
  if(groupRef) {
     groupRef.value.rotation.y = elapsed
     groupRef.value.rotation.z = elapsed
  }
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[50, 50, 50]" />
    <OrbitControls />
    <TresGroup ref="groupRef" >
      <Suspense>
        <GLTFModel path="models/teapot.gltf" draco />
      </Suspense>
    </TresGroup>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
