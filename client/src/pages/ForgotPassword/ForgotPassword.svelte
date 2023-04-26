<script>
    import { BASE_URL } from "../../stores/globalStore.js";
    import { navigate } from "svelte-navigator";
    import { writable } from "svelte/store";
 
  
    let username = "";
  
    async function handleSubmit() {
      const userinfo = { data: { username: username } };
  
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
    }
  
    async function sendEmail(){
        const response = await fetch($BASE_URL + "/auth/forgotPassword");
    }
  </script>
  
  <h1>Forgot Password</h1>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="forgotPw">
      <label for="email">Username:</label>
      <input type="text" id="email" bind:value={username} />

    </div>
    <button on:click={sendEmail} class="forgot-password">Reset password</button>
  </form>
  

  
  <style>
    .forgotPw {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
     
    }

    .forgot-password{
      margin-top: 20px;
    }
  </style>
  