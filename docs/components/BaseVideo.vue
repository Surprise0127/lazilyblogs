<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

// 直接使用原视频地址
const videoRef = ref(null)
</script>

<template>
    <div class="video-container">
      <video 
        ref="videoRef"
        :src="props.src" 
        class="video-component-202506"
        controls
        crossorigin="anonymous"
        @contextmenu.prevent
        controlslist="nodownload nofullscreen noplaybackrate noremoteplayback"
        autoplay="true"
        muted="true"
        loop="true"
      ></video>
    </div>
</template>

<style scoped>

/* 针对 Firefox 的兼容性问题*/
::deep .video-component-202506::-moz-media-controls-download-button { display: none !important; }
::deep .video-component-202506::-moz-media-controls-fullscreen-button { display: none !important; }

.video-component-202506 {
  border: 1px solid #ffffff;
  border-radius: 20px;
  padding: 1px;
  margin: 30px 0;
  background-color: #7c7c7c;
  position: relative;

  /* 阴影 */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
}

.video-container {
  width: 100%;
  max-width: 690px;
  margin: 0 auto;
  position: relative;
}

.video-component-202506 {
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
}

.watermark {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  user-select: none;
}
</style>