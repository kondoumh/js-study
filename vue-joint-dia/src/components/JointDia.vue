<template>
  <div>
    <div ref="myholder"></div>
    <input type="text" placeholder="new node name" v-model.trim="nodeName" v-on:keyup.ctrl.enter="addNode"/>
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
        width: 800,
        height: 600,
        gridSize: 1,
        drawGrid: true,
        background: {
          color: "rgba(0, 128, 0, 0.1)"
        }
      })

      paper.on('cell:pointerup', (cellView) => {
        const linkMode = this.linkMode
        if (!linkMode) return
        if (this.from === null) {
          cellView.highlight()
          this.cellViewFrom = cellView
          this.from = cellView.model
        } else if (this.to === null) {
          this.to = cellView.model;
        }
        if (this.from && this.to) {
          this.addLink(this.from, this.to)
          this.from = null
          this.to = null
          this.linkMode = false
          this.cellViewFrom.unhighlight()
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
        linkMode: false,
        cellViewFrom: null,
        from: null,
        to: null,
      }
    },
    methods : {
      addNode() {
        if(!this.nodeName) {
            return
        }
        this.addNodeWithName(this.nodeName)
        this.nodeName = ''
      },
      addNodeWithName(name) {
        const rect = new joint.shapes.standard.Rectangle()
        const x = Math.random() * 700
        const y = Math.random() * 500
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
          console.log(name, position.x, position.y)
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