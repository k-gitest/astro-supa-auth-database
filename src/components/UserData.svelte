<script lang="ts">
  import { onMount } from "svelte";

  let user;

  onMount(async () => {
    try {
      const response = await fetch("/api/auth/statechanged");
      const res = await response.json();
      user = res.user;
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div>
  <h3>UserData</h3>
  {#if user}
    <p>Hello!{user.email}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
