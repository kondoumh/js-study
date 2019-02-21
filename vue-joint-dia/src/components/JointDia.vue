<template>
  <div>
    <div ref="myholder"></div>
  </div>
</template>

<script>
  import joint from 'jointjs'

  export default {
    name: 'JointDiagram',
    mounted(){
      let graph = new joint.dia.Graph
      let paper = new joint.dia.Paper({
        el: this.$refs.myholder,
        model: graph,
        width: 600,
        height: 100,
        gridSize: 1
      })
      let rect = new joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.attr({
          body: {
            fill: 'blue'
          },
          label: {
            text: 'Hello',
            fill: 'white'
          }
      });
      rect.addTo(graph);

      let rect2 = rect.clone();
      rect2.translate(300, 0);
      rect2.attr('label/text', 'World!');
      rect2.addTo(graph);

      let link = new joint.shapes.standard.Link();
      link.source(rect);
      link.target(rect2);
      link.addTo(graph);
    }
  }
</script>