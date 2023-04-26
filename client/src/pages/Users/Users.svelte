<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore.js";
    import {users} from "../../stores/userStore.js"
   

    async function getUsers(){
        const response = await fetch($BASE_URL + "/users", {
            credentials: "include"
        });
        const { data: usersFromDb }  = await response.json();
        console.log(usersFromDb);
        users.set(usersFromDb)
    }
onMount(()=>{
    getUsers();
}


    );
</script>

<h1>User List</h1>

<ul>
    <!-- Use the `each` block to iterate over the list of users -->
    {#each $users as user}
      <li>{user.username}</li>
    {/each}
  </ul>