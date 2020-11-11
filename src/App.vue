<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}

button {
  background-color: #fff;
  border: none;
  min-width: 30px;
  min-height: 30px;
  border-radius: 5px;
  padding-top: 3px;
  opacity: 0.5;
  transition: 0.2s;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }
}
input {
  font-size: 1rem;
  /*border: solid #a3ccd9;*/
  /*border-width: 0 0 2px 2px;*/
  padding-left: 10px;
  border-radius: 5px;
  border-width: 0 0 1px;
  opacity: 0.3;
  transition: 0.5s;
  width: fit-content;

  &:focus {
    opacity: 1;
    outline: none;
    background-image: linear-gradient(0.25turn, lightgray, white);

  }
}
</style>
