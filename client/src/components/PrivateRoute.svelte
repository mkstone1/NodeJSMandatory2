<!-- PrivateRoute.svelte -->
<script>
  import { Route, navigate } from "svelte-navigator";
  import { BASE_URL } from "../stores/globalStore.js";
  import NotAllowed from "../pages/NotAllowed/NotAllowed.svelte";
  import { isAdmin } from "../stores/isAdmin.js";
  import { useLocation } from "svelte-navigator";


  export let component;
  export let path;
  const location = useLocation();

  console.log($isAdmin);
  console.log($location);
  console.log(path);
</script>

{#if $isAdmin }
  <Route {component} {path} />
{:else if $location.pathname === path}
  {#await navigate("/NotAllowed", { replace: true })}{/await}
  {:else}

{/if}
