<template>
  <div class="user">
    <button id="dropdown" class="user-settings" @click="toggleDropdown">
      <span class="icon-container"><font-awesome-icon icon="user-cog"/></span>
    </button>
    {{this.user}}
    <transition name="slide-fade">
      <div v-if="activeDropdown" :class="{'active-dropdown': activeDropdown}">
        <ul>
          <li>
            <router-link  v-if="userSession" @checkUser="userSession" to="/login" tag="div" class="links" exact active-class="active">Logi sisse</router-link>
            <div class="links" v-if="!this.user" @checkUser="userSession" @click="onLogout">Logi välja</div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'Profile',

    data () {
      return {
        activeDropdown: false,
        user: false,
      }
    },
    methods: {
      toggleDropdown(e) {
        e.stopPropagation();
        this.activeDropdown = !this.activeDropdown;
        if (this.activeDropdown) {
          window.addEventListener('click', () => {
            this.activeDropdown = false
          })
        } else {
          window.removeEventListener('click', () => {
            this.activeDropdown = false
          })
        }
      },
      async onLogout() {
        try {
          await this.axios.post('/api/logout');
          await this.$router.push({name: 'Login'});
          this.user = false
        } catch (err) {
          console.log(err.response);
        }
      },
      userSession() {
        this.user = true
      }
    },
  }
</script>

<style scoped lang="scss">
  .user {
    display: flex;
    width: 39px;
    flex: 1;
  }
</style>