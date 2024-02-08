<script lang="ts">
  import { onMount } from "svelte";
  import { userData } from "@/store/store";

  let user;
  $: uid = $userData;

  onMount(async () => {
    try {
      const response = await fetch("/api/database/database");
      const res = await response.json();
      user = res;
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div>
  <h3>NotesData</h3>
  {#if user}
    <p>Hello!{user.todo[0].id}</p>
    <p>{user.todo[0].todo}</p>
  {:else}
    <p>Loading...</p>
  {/if}
  {#if uid}
    <p>{uid}</p>
  {:else}
    <p>no User</p>
  {/if}
</div>
