<template>
  <div class="user">
    <button id="dropdown" class="user-settings" @click="toggleDropdown">
      <span class="icon-container"><font-awesome-icon icon="user-cog"/></span>
    </button>
    <transition name="slide-fade">
      <div v-if="activeDropdown" :class="{'active-dropdown': activeDropdown}">
        <ul>
          <li>
            <div class="links" @click="onLogout">Logi välja</div>
            <div class="links"><router-link to="/login" tag="div" exact active-class="active">Logi sisse</router-link></div>
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
          await this.axios.post('/logout');
          await this.$router.push({name: 'Login'});
          this.user = true
          console.log('logout',this.user)
        } catch (err) {
          console.log(err);
        }
      },
      async checkUser() {
        try {
          await this.axios.get('/session/')
          console.log('checkuser',this.user);
        } catch (err) {
          console.log(err.response);
        }
      },
    },
    mounted() {
      this.checkUser()
    }
  }
</script>

<style scoped lang="scss">
  .user {
    display: flex;
    width: 39px;
    flex: 1;
  }
</style>