export function useGraph() {
  const graphData = ref([]);
  const width = ref(0);
  const height = ref(0);

  const nodes = computed(() => {
    let nodes = graphData.value.pages
      .map(page => ({
        id: page.id,
        title: page.title,
        x: width.value * Math.random(),
        y: height.value * Math.random(),
        rx: byteLength(page.title) * 2,
        ry: 10,
        user: false
      }));

    const users = graphData.value.users
      .map(user => ({
        id: user.id,
        title: user.name,
        x: width.value * Math.random(),
        y: height.value * Math.random(),
        rx: byteLength(user.name),
        ry: 10,
        user: true
      }));
    nodes = nodes.concat(users);
    return nodes;
  });

  const edges = computed(() => {
    const ids = new Set(nodes.value.map(node => node.id));
    const idm = new Map();
    nodes.value.forEach((node, index) => idm[node.id] = index);
    let edges = graphData.value.links
      .filter(edge => ids.has(edge.from) && ids.has(edge.to))
      .map(edge => ({
        source: idm[edge.from],
        target: idm[edge.to],
        l: Math.random() * 150
      }));

    const userPages = graphData.value.userPages
      .filter(up => ids.has(up.user) && ids.has(up.page))
      .map(up => ({
        source: idm[up.user],
        target: idm[up.page],
        l: Math.random() * 300
      }));
    edges = edges.concat(userPages);
    return edges;
  });

  const fetchData = async project => {
    const { data: graph } = await useFetch(
      `https://sb-graph-kondoumh.netlify.app/${encodeURIComponent(project)}_graph.json`, 
    );
    graphData.value = graph.value;
  };

  const byteLength = (str) => {
    str = (str==null) ? "" : str;
    return encodeURI(str).replace(/%../g, "*").length;
  };

  return {
    width,
    height,
    nodes,
    edges,
    fetchData,
  };
}
