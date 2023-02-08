async function fetchPageInfo(project, title) {
  this.pageTitle = title
  const res = await fetch('/.netlify/functions/pageInfo', {
    headers: {
      'project': project,
      'title': encodeURIComponent(this.pageTitle)
    }
  })
  const info = await res.json()
  return info
}

function getProjects() {
  return ['kondoumh', 'help-jp', 'comic-forum', 'icons']
}

export default { fetchPageInfo, getProjects }
