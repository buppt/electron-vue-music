<template>
  <div class="page">
    <main class="main">
      <aside class="aside">
        <aside-view></aside-view>
      </aside>
      <content class="content">
        <header class="header">
          <header-view></header-view>
        </header>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </content>
    </main>
    <footer class="footer">
      <footer-view></footer-view>
    </footer>
  </div>
</template>

<script>
import AsideView from '../components/AsideView'
import HeaderView from '../components/HeaderView'
import FooterView from '../components/FooterView'
export default {
  name: 'index-page',
  components: { AsideView, HeaderView, FooterView }
}
</script>

<style scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  display: flex;
}
.aside {
  width: 250px;
}
.content {
  flex: 1;
  overflow: auto;
}
.header {
  height: 50px;
}
.footer {
  height: 70px;
}
</style>
