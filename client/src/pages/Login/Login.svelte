<script>
  import { BASE_URL } from "../../stores/globalStore.js";
  import { navigate } from "svelte-navigator";
  import { loggedIn } from "../../stores/loggedIn.js";
  import { writable } from "svelte/store";
  import { isAdmin } from "../../stores/isAdmin.js";
  import toastr from 'toastr';


  const failedLogin = writable(false);

  let username = "";
  let password = "";

  async function handleSubmit() {
    const userinfo = { data: { username: username, password: password } };

    const response = await fetch($BASE_URL + "/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });

    const responseStatus = await response.json();
    console.log(responseStatus)
  

    if (responseStatus.data[0].message === "success" || !responseStatus) {
      loggedIn.set(true);

      if (responseStatus.data[1]) {
        isAdmin.set(true);
      }
      toastr.success("YOU ARE NOW LOGGED IN")
      navigate("/");
    } else {
      username = "";
      password = "";
      failedLogin.set(true);
    }
  }

  function forgotPassword(){
    navigate("/forgotPassword")

  }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={handleSubmit}>
  <div class="loginForm">
    {#if $failedLogin}
      <p class="failed-login">Login failed! Try again</p>
    {/if}
    <label for="email">Username:</label>
    <input type="text" id="email" bind:value={username} />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} />
  </div>
  <button type="submit">Login</button>
</form>

<button on:click={forgotPassword} class="forgot-password">Forgot Password</button>

<style>
  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
   
  }
  .failed-login {
    background-color: red;
    padding: 10px;
    border-radius: 5%;
  }
  .forgot-password{
    margin-top: 20px;
  }
</style>
