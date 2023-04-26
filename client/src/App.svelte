<script>
  import { Router, Link, Route, navigate } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import Login from "./pages/Login/Login.svelte";
  import Users from "./pages/Users/Users.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NotAllowed from "./pages/NotAllowed/NotAllowed.svelte";
  import { onMount } from "svelte";
  import { BASE_URL } from "./stores/globalStore.js";
  import { loggedIn } from "./stores/loggedIn.js";
  import {isAdmin} from "./stores/isAdmin.js"
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import toastr from 'toastr';

  const handleLogout = async () => {
    const response = await fetch($BASE_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    toastr.error("You are now logged out")
    loggedIn.set(false);
    isAdmin.set(false);
    navigate("/");
  };

</script>

<Router>
  <nav class="navbar">
    <div class="right-links">
      <Link to="/">Home</Link>
      {#if $isAdmin}
        <Link to="/users">Users</Link>
      {/if}
    </div>

    {#if $loggedIn}
      <button on:click={handleLogout}>Logout</button>
    {:else}
      <Link to="/login">Login</Link>
    {/if}
  </nav>


  <Route path="/">
    <Home />
  </Route>

  <Route path="/forgotPassword">
    <ForgotPassword />
  </Route>


  <Route path="/NotAllowed" component={NotAllowed} />

  <Route path="/login">
    <Login />
  </Route>

  <PrivateRoute path="/users" component={Users} />
  
</Router>

<style>
  .navbar {
    display: flex;
    height: 100%;

    justify-content: space-around;
    background-color: BLACK;
    height: 5vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
    padding-left: 10em;
  }
  .right-links {
    display: flex;
  }
</style>
