<script>
  let user = {
    firstName: 'Ada',
    lastName: 'Lovelace'
  };
</script>

<input bind:value={user.firstName}>
<input bind:value={user.lastName}>

{@debug user}

<h1>Hello {user.firstName}</h1>
