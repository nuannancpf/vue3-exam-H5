<template>
  <!-- <van-nav-bar :title="title" :left-text="leftText" :left-arrow="leftArrow" @click-left="onClickLeft" :fixed="true" :placeholder="true" v-if="hidetopbar" /> -->
  <router-view />
</template>
<script setup lang="ts" name="App">
import { ref, reactive, watch } from 'vue'
import { showConfirmDialog } from 'vant';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const title = ref("")
const hidetopbar = ref(true)
const leftText = ref("")
const leftArrow = ref(true)
const hidefooter = ref(true)
const isDialog = ref(false)

watch(() => route, (newVal) => {
  title.value = newVal.meta.title
  newVal.meta.hidetopbar ? hidetopbar.value = false : hidetopbar.value = true
  newVal.meta.leftArrow ? leftArrow.value = false : leftArrow.value = true
  newVal.meta.hidefooter ? hidefooter.value = false : hidefooter.value = true
  newVal.meta.isDialog ? isDialog.value = true : isDialog.value = false

}, { deep: true, immediate: true })

const onClickLeft = () => {
  if (isDialog.value) {
    showConfirmDialog({
      message: '确定要退出答题？ \n退出后答案历史将不会保留',
      showCancelButton: true,
      confirmButtonColor: "#0074FF"
    })
      .then((action) => {
        // on confirm
        console.log(action, 'action');
        if (action === 'confirm') {
          router.go(-1)
        } else {
          console.log('取消');
        }
      })
      .catch(() => {
        // on cancel
        console.log('取消');

      });
  } else {
    router.go(-1)
  }
}
</script>
<style>
</style>
