<template lang="pug">
  .main-content
    Nuxt
</template>

<script>
export default {
  name: 'LoginLayout',

  async mounted() {
    await this.$store.dispatch('language/getLocate', this.language)
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  font-family: 'Chivo Mono' !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1.875rem;
  width: 100%;
  height: 100vh;
  background: #2980b9
    url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png')
    repeat 0 0;
  -webkit-animation: 10s linear 0s normal none infinite animate;
  -moz-animation: 10s linear 0s normal none infinite animate;
  -ms-animation: 10s linear 0s normal none infinite animate;
  -o-animation: 10s linear 0s normal none infinite animate;
  animation: 10s linear 0s normal none infinite animate;
}
@-webkit-keyframes animate {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}

@-moz-keyframes animate {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}

@-ms-keyframes animate {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}

@-o-keyframes animate {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}

@keyframes animate {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}
</style>
