<template>
  <nav class="navbar">
    <SVGStudioLogo class="navbar-left" />
    <div class="navbar-right">
      <ChangeTheme class="navbar-sub" />
      <SVGLogoParam class="navbar-sub" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: static;
  background-image: radial-gradient(
    var(--main-color-darker),
    var(--grey-color-dark)
  );
  width: 100%;
  height: 60px;
  overflow: visible;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}

.navbar-left {
  align-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  width: 100px;
}

.navbar-right {
  width: 100px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.navbar-sub {
  width: 30px;
  height: 30px;
  display: flex;
}
</style>
