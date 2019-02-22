<template>
  <div>
    <div ref="myholder"></div>
    <input type="text" placeholder="new node name" v-model="nodeName" />
    <input type="button" v-on:click="addNode" value="add node" >
    <input type="checkbox" id="checkLink" v-model="linkMode" />
    <label for="checkLink">link mode</label>
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

      let cellViewFrom = null;
      let from = null;
      let to = null;

      paper.on('cell:pointerup', (cellView) => {
        const linkMode = this.linkMode
        if (!linkMode) return
        if (from === null) {
          cellView.highlight()
          cellViewFrom = cellView
          from = cellView.model
        } else if (to === null) {
          to = cellView.model;
        }
        if (from && to) {
          this.addLink(from, to)
          from = null
          to = null
          this.linkMode = false
          cellViewFrom.unhighlight()
        }
      })

      const rect1 = this.addNodeWithName('ふなっしー')
      const rect2 = this.addNodeWithName('ヒャッハー')
      const rect3 = this.addNodeWithName('梨汁プシャー')
      this.addLink(rect1, rect2)
      this.addLink(rect1, rect3)
    },
    data() {
      return {
        graph: {},
        nodeName: '',
        colors: ["red", "blue", "black", "orange", "green"],
        linkMode: false
      }
    },
    methods : {
      addNode() {
        console.log(this.nodeName)
        console.log(this.linkMode)
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
      },
      addLink(source, target) {
        const link = new joint.shapes.standard.Link()
        link.source(source)
        link.target(target)
        link.addTo(this.graph)
      }
    }
  }
</script>