<template>
  <header class="main-header">
    <div class="row">
      <div class="col-2">
        <nuxt-link
          to="/"
          exact
          class="logo"
        >
          UI Generator
        </nuxt-link>
      </div>
      <div class="col-10">
        <nav>
          <nuxt-link
            to="/list"
            exact
          >
            List
          </nuxt-link>
          <nuxt-link
            to="/form"
            exact
          >
            Form
          </nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    .main-header {
        height: 50px;
        background-color: #333;
    }

    .logo {
      padding-left:20px;
      color:#FFF;
    }

    nav {
      padding-left: 10px;
    }

    a {
        font-family: Helvetica, sans-serif;
        color: rgba(255,255,255,0.5);
        font-size: 1rem;
        font-weight: 100;
        margin-right:20px;
        line-height: 50px;

        &:hover {
          color:#FFF;
        }

        &.nuxt-link-active {
          color:#FFF;
        }
    }
</style>
