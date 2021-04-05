<script>
  let user = {
    firstName: 'Ada',
    lastName: 'Lovelace'
  };
</script>

<input bind:value={user.firstName}>
<input bind:value={user.lastName}>

{(console.log(user), '')}

<h1>Hello {user.firstName}</h1>
