<script>
  import App_1 from './App_1.svelte';
import App_2 from './App_2.svelte';
import Info from './info.svelte';

  const pkg = {
    name: 'svelte',
    version: 3,
    speed: 'blazing',
    website: 'https://svelte.dev'
  };
</script>

<!-- <Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>-->
<Info {...pkg}/>
