<template>
  <!-- <van-nav-bar :title="title" :left-text="leftText" :left-arrow="leftArrow" @click-left="onClickLeft" :fixed="true" :placeholder="true" v-if="hidetopbar" /> -->
  <router-view />
  <examMusic class="exam-music"></examMusic>
</template>
<script setup lang="ts" name="App">
import examMusic from './views/Exam/components/examMusic.vue';
</script>
<style>
</style>
