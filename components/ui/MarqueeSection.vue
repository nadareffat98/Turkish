<template>
  <div class="hero-marquee">
    <div class="marquee">
      <div class="marquee-track">
        <div class="marquee-content" v-for="i in 3" :key="i">
          <div
            v-for="item in 8"
            class="flex items-center gap-2 px-4 text-white"
          >
            <img src="/logo/logo.png" class="sm:w-10 sm:h-6 w-8 h-4" />
            <span class="sm:text-lg tex-base font-bold">Up to 20% sale</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.hero-marquee {
  width: 100%;
  background: var(--second-color);
  overflow: hidden;
  padding: 4px 0;
  .marquee {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
    direction: ltr;
    .marquee-track {
      display: inline-flex;
      white-space: nowrap;
      width: auto;
      will-change: transform;
      animation-duration: 30s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }
  .marquee-right .marquee-track {
    animation-name: scroll-right;
  }
  .marquee {
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
    direction: ltr;
    .marquee-track {
      display: inline-flex;
      white-space: nowrap;
      width: auto;
      will-change: transform;
      animation-duration: 30s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-name: scroll-right;
      :dir(rtl) & {
        animation-name: scroll-left;
      }
      .marquee-content {
        display: flex;
        img {
          flex-shrink: 0;
        }
      }
    }
    &:hover .marquee-track {
      animation-play-state: paused;
    }
  }
  @media (min-width: 640px) {
    padding: 8px 0;
  }
}
@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
