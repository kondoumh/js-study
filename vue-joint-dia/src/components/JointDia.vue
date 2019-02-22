<template>
  <div>
    <div ref="myholder"></div>
    <input type="text" placeholder="new node name" v-model="nodeName" />
    <p>node name is {{nodeName}}</p>
    <input type="button" v-on:click="addNode" value="add node" >
    <input type="checkbox" ref="link" />link
  </div>
</template>

<script>
  import joint from 'jointjs'

  export default {
    name: 'JointDia',
    mounted(){
      this.graph = new joint.dia.Graph
      this.graph.on('add', (elm) => {
        console.log('add : ' + elm.cid)
      })
      let paper = new joint.dia.Paper({
        el: this.$refs.myholder,
        model: this.graph,
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

      const append = () => {
        //const label = this.$refs.new-node-label
        if (label != 'hoge') {
          addNode(label)
        }
        //this.$refs.new-node-label
      }

      const addLink = (source, target) => {
        const link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        link.addTo(this.graph);
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
          //$('#link').prop('checked', false)
          cellViewFrom.unhighlight()
        }
      })

      const init = () => {
        const rect1 = this.addNodeWithName('Hello')
        const rect2 = this.addNodeWithName('JointJS')
        const rect3 = this.addNodeWithName('World')
        addLink(rect1, rect2)
        addLink(rect2, rect3)
      }
      init()
    },

    data() {
      return {
        graph: {},
        nodeName: '',
        colors: ["red", "blue", "black", "orange", "green"]
      }
    },
    methods : {
      addNode() {
        console.log(this.nodeName)
        const name = this.nodeName.trim()
        if(!name) {
            return
        }
        this.addNodeWithName(name)
      },
      addNodeWithName(name) {
        const rect = new joint.shapes.standard.Rectangle()
        const x = Math.random() * 330
        const y = Math.random() * 220
        rect.position(x, y)
        rect.resize(100, 40)
        rect.attr({
          body: {
            fill: this.colors[parseInt(Math.random() * Math.floor(this.colors.length))]
          },
          label: {
            text: name,
            fill: 'white'
          }
        })
        rect.on('change:position', (e, position)=> {
          console.log(position.x, position.y)
        })
        rect.addTo(this.graph)
        return rect
      }
    }
  }
</script>