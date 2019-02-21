<template>
  <div>
    <div ref="myholder"></div>
    <input type="button" value="debug" ref="debug" />
    <input type="text" placeholder="New node label" ref="new-node-label" />
    <input type="button" value="add node" ref="add-node" @click="exec"/>
    <input type="checkbox" ref="link" />link
    <input type="button" value="init" ref="init" />
  </div>
</template>

<script>
  import joint from 'jointjs'

  export default {
    name: 'JointDiagram',
    mounted(){
      let graph = new joint.dia.Graph
      graph.on('add', (elm) => {
        console.log('add : ' + elm.cid)
      })
      let paper = new joint.dia.Paper({
        el: this.$refs.myholder,
        model: graph,
        width: 400,
        height: 300,
        gridSize: 1,
        drawGrid: true,
        background: {
          color: "rgba(0, 255, 0, 0.3)"
        }
      })

      const colors = ["red", "blue", "black", "orange", "green"]
      const selectColor = () => {
        const n = parseInt(Math.random() * Math.floor(colors.length));
        return colors[n];
      }

      const addNode = (label) => {
        const rect = new joint.shapes.standard.Rectangle()
        const x = Math.random() * 330
        const y = Math.random() * 220
        rect.position(x, y)
        rect.resize(100, 40)
        rect.attr({
          body: {
            fill: selectColor()
          },
          label: {
            text: label,
            fill: 'white'
          }
        })
        rect.on('change:position', (rect, position)=> {
          console.log(label, position.x, position.y)
        })
        rect.addTo(graph)
        return rect
      }

      const append = () => {
        //const label = this.$refs.new-node-label
        if (label != 'hoge') {
          addNode(label)
        }
        //this.$refs.new-node-label
      }

      // $('#add-node').click(() => {
      //   append()
      // })

      // $('#new-node-label').keypress((key) => {
      //   if (key.charCode == 13) {
      //     append()
      //   }
      // })

      const addLink = (source, target) => {
        const link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        link.addTo(graph);
      };

      let cellViewFrom = null;
      let from = null;
      let to = null;

      paper.on('cell:pointerup', (cellView) => {
        //const linkMode = $('#link').prop('checked')
        const linkMode = false
        if (!linkMode) return
        if (from === null) {
          cellView.highlight()
          cellViewFrom = cellView
          from = cellView.model
        } else if (to === null) {
          to = cellView.model;
        }
        if (from && to) {
          addLink(from, to)
          from = null
          to = null
          $('#link').prop('checked', false)
          cellViewFrom.unhighlight()
        }
      })

      const init = () => {
        const rect1 = addNode('Hello')
        const rect2 = addNode('JointJS')
        const rect3 = addNode('World')
        addLink(rect1, rect2)
        addLink(rect2, rect3)
      }

      init()

    },
    methods: {
      exec: () => {
        console.log("hoge");
      }
    }
  }
</script>