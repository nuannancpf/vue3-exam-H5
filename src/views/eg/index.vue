<template>
      <div>
            <div class="card" :class="{ 'card-flipped': cardFlip }">
                  <div class="timeDesc">
                        {{ timeDesc }}
                  </div>
                  <div class="time">{{ time }}</div>
            </div>

            <div class="exam_progress">
                  <div class="Group903">
                        <div class="progress-bar">
                              <div class="progress" :style="{ width: progressValue + '%' }"></div>
                        </div>

                  </div>
            </div>
            <div style="font-size: 25px;">
                  {{ progressValue }}
            </div>
            <van-button color="#117BD6" round type="primary" class="button-primary" @click="startGame">暂停计时</van-button>
            <van-button color="#117BD6" round type="primary" class="button-primary" @click="cxClick">重置</van-button>
      </div>
</template>
<script lang="ts" setup name="eg">
import { ref, onMounted, nextTick, computed } from 'vue'
const cardFlip = ref('')
const [TM1, TM2] = [5, 10]
const time = ref(TM1)
const timer = ref(null)
const isLock = ref(0)
const timeDesc = ref('')
const progressValue = ref(0)
const init = () => {
      time.value = TM1
      clearTime()
      progressValue.value = 0
      timeDesc.value = '记忆'
      isLock.value = 0
      start()
}
const start = () => {
      if (isLock.value === 0) {
            isLock.value = 1
            timer.value = setTimeout(() => {
                  cardFlip.value = "card-flipped"
                  cound()
            }, 2000)

      }

}
const cound = () => {
      if (time.value === 0) {
            if (isLock.value == 1) {
                  timeDesc.value = "倒计时"
                  time.value = TM2
                  play()
            } else {
                  timeDesc.value = '记忆'
                  time.value = TM1
                  clearTime()
            }
      } else {
            console.log("isLock =》：", isLock.value, 'time 有值：', time.value, '进度条：', progressValue.value);
            if (isLock.value === 2 && time.value !== 0) {
                  progress()
            }

            time.value--
            timer.value = setTimeout(() => {
                  cound()
            }, 1000)
      }
}
const play = () => {
      timer.value = setTimeout(() => {
            isLock.value = 2
            cound()

      }, 2500)
      // progress()
      // clearTime()
}
let intervalId = ref(null)
const progress = () => {
      // intervalId.value = setInterval(() => {
      if (progressValue.value < 100) {
            progressValue.value += 10;
      }
      // else {
      //             clearInterval(intervalId.value);
      //       }
      // }, 1000);
}
const clearTime = () => {
      clearTimeout(timer.value)
      clearInterval(intervalId.value);

}
const startGame = () => {
      if (isLock.value === 2) {
            clearTime()
      }
}
const cxClick = () => {
      if (isLock.value === 2) {
            init()
      }

}
onMounted(() => {
      init()
})
</script>
<style lang="less" scoped>
.timeDesc {
    font-size: 15px;
    font-weight: 800;
    color: crimson;
}

.time {
    font-size: 15px;
    font-weight: 800;
    color: darkgreen;
}
.card-flipped .timeDesc {
      z-index: 10;
      // -webkit-transform: rotateY(180deg);
      // transform: rotateY(180deg);
      color: red;
      font-size: 25px;
}
.card-flipped .time {
      z-index: 10;
      // -webkit-transform: rotateY(180deg);
      // transform: rotateY(180deg);
      color: rgb(136, 0, 255);
      font-size: 25px;
}
.exam_progress {
      margin: 12px 0 0;
      height: 15px;
      display: flex;
      justify-content: center;


}

.Group903 {
      /* width: 207px;
    height: 100%;
    background: #E42A24;
    border-radius: 49px 49px 49px 49px;
    opacity: 1;
    border: 2px solid #FFB4B1; */
      width: 194px;
      height: 19px;
      background-image: url("@/assets/Group903.png");
      background-repeat: no-repeat;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: center;

}

.progress-bar {
      width: 95%;
      height: 15px;
      /* // border: 1px solid #ccc; */
      border-radius: 7px;
      overflow: hidden;
}

.progress {
      height: 100%;
      background-color: #fff;
      transition: width 0.5s ease-in-out;
}
</style>
