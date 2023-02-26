<template>
  <svg id="svg" />
</template>

<script setup>
  import * as d3 from 'd3';
  const { width, height, nodes, edges, fetchData } = useGraph();
  const project = useState('selected-project');

  onMounted(async () => {
    width.value = document.querySelector('svg').clientWidth;
    height.value = document.querySelector('svg').clientHeight;
    await fetchData(project.value);
    await render();
  });

  watch(() => project.value, async () => {
    await fetchData(project.value);
    await render();
  });

  const render = async () => {
    d3.select('svg').selectAll('*').remove();

    const zoom = d3.zoom()
      .scaleExtent([1/3, 40])
      .on('zoom', (e, d) => {
        link.attr('transform', e.transform);
        nodeGroup.attr('transform', e.transform);
      });

    d3.select('svg')
      .attr('viewBox', '0 0 1200 1400')
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom);

    const link = d3.select('svg')
      .selectAll('line')
      .data(edges.value)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', 'LightGray');

    const nodeGroup = d3.select('svg')
      .selectAll('g')
      .data(nodes.value)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', (e, d) => {
          if (!e.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (e, d) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on('end', (e, d) => {
          if (!e.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }))
      .on('click', (e, d) => {
        if (d.user) return;
        const page = encodeURIComponent(d.title);
        const url = `https://scrapbox.io/${encodeURIComponent(project.value)}/${page}`;
        window.open(url);        
      });

    nodeGroup.append('ellipse')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('rx', d => d.rx)
      .attr('ry', d => d.ry)
      .attr('fill', d => d.user ? 'Cyan' : 'Gold');

    nodeGroup.append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', 'steelbule')
      .style('font-size', '11px')
      .text(d => d.title);

    const simulation = d3.forceSimulation()
      .force('link',
        d3.forceLink()
          .distance(d => d.l)
          .iterations(2))
      .force('collide',
        d3.forceCollide()
          .radius(d => d.r)
          .strength(0.7)
          .iterations(2))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX().strength(0.01).x(width.value / 2))
      .force('y', d3.forceY().strength(0.01).y(height.value / 2))
      .force('center', d3.forceCenter(width.value / 2, height.value / 2));

    simulation
      .nodes(nodes.value)
      .on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
        nodeGroup.select('ellipse')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        nodeGroup.select('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      });

    simulation.force('link')
      .links(edges.value)
      .id(d => d.index);

    link.call(zoom);
    nodeGroup.call(zoom);
  };
</script>

<style scoped>
  svg {
    position: fixed;
    top: 50px;
    left: 0;
    height: 100%;
    width: 100%
  }
</style>
