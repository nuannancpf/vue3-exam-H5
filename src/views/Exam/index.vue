<template>
      <div class="exam">
          
            <template v-for="(item, ind) in questData">
                  <div class="backgroun_icon" :key="item.id" v-if="list_active === (ind + 1)">
                        <div class="desc">
                              <div class="desc-time">
                                    <div class="time checkpoint">
                                          <div class="time-text">关卡</div>
                                          <div class="time-num">{{ list_active }}</div>
                                    </div>
                                    <div class="time">
                                          <div class="time-text">{{ timeDesc }}</div>
                                          <div class="time-num">{{ time }}s</div>
                                    </div>
                              </div>
                              
                        </div>
                        <div class="exam_progress">
                              <div class="Group903">
                                    <div class="progress-bar">
                                          <div class="progress" :style="{ width: progressValue + '%' }"></div>
                                    </div>
                              </div>
                        </div>
                        <div class="exam_tips">
                              <div class="tips">
                                    <div>请找出：</div>
                                    <div class="tips-icon" :style="{ backgroundImage: `url(${correctIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain' }"></div>
                              </div>
                        </div>

                        <div class="exam_card">
                              <div class="card_list">
                                    <div v-for="(card, $index) in exanCardList" :key="$index" class="card" :class="{ 'card-flipped': cardFlip }" @click="cardClick(item, card, card['index'], $index)" ref="cardsRef">
                                          <div class="face front"></div>
                                          <div class="face back" :class="{ 'flip': cardFlip }" :style="{ backgroundImage: `url(${card['logoImgUrl']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain' }">
                                          </div>

                                    </div>
                              </div>
                        </div>
                  </div>
            </template>

            <Propover :showSelect="showSelect">
                  <div class="startGame" v-if="showModalIndex === 4">
                        <van-button color="#117BD6" round type="primary" class="button-primary" @click="startGame">开始游戏</van-button>
                  </div>
                  <ExamSelect :questEvent="questEvent" @select-click="selectClick" v-if="showModalIndex === 6"></ExamSelect>
                  <ExamSuccessful @modleClick="modleClick" v-if="showModalIndex === 7"></ExamSuccessful>
                  <ExamAgain @modleClick="playAgain" :modleDesc="modleDesc" v-if="showModalIndex === 8"></ExamAgain>
            </Propover>

      </div>
</template>

<script lang="ts" setup name="exam">
import { ref, onMounted, nextTick, computed } from 'vue'
import examMusic from "./components/examMusic.vue"
import Propover from "./components/propover.vue"
import ExamSelect from "./components/examSelect.vue"
import ExamSuccessful from "./components/examSuccessful.vue"
import ExamAgain from "./components/examAgain.vue"
import { getQuestionList, submitQuestion } from "@/api/index" // 获取题库和提交用户答题的接口
const questData = ref([]) // 题库
const list_active = ref(1) // 游戏关卡
const getQuest = async () => { // 获取选择题题库
      await getQuestionList().then(res => {
            console.log(res, '题库');
            const { code, data } = res
            if (code === 0) {
                  questData.value = data
                  nextTick(() => {
                        init()
                  })
            }
      })
}
const isPass = ref(null) // 是否通关， 0 否 1是
const startTime = ref(null)  // 游戏开始时间
const endTime = ref(null) // 游戏结束时间
const totalTime = ref(null) // 玩游戏的时长
const start = () => { // 游戏开始计时 时长
      startTime.value = new Date().getTime();
}
const submit = async () => { // 提交用户答题结果
      let userId = localStorage.getItem('TOKEN')
      console.log('提交问题先', list_active.value);
      let data = {
            answerTime: totalTime.value,
            currentLevel: list_active.value,
            isPass: isPass.value,
            userId: userId,
            optionsList: findCardData.value
      }
      await submitQuestion(data).then(res => {
            findCardData.value = []
      })
}

const [TM1, TM2] = [10, 20] // 记忆时间 ， 倒计时
const cardsRef = ref() // 翻牌卡牌 ref
const cardList = ref([]) // 卡牌数组数据
const cardFlip = ref("") // 卡牌翻转的仪式
const isLock = ref(0) // 游戏状态
const time = ref(TM1) // 游戏计时器
let timer = ref(null) // 计时器
const correctIcon = ref("") // 正确图片
const cardData = ref([]) // 正确的图标随机索引
const wnogsData = ref([]) // 其他的图标随机索引
const modleDesc = ref('再次挑战') // 弹框text
const timeDesc = ref('记忆时间')

const progressValue = ref(0) // 进度条

import { generateRandomIcons } from "./util/util"
const cardInit = () => {
      let { examList, examData, examArr, correctIndex } = generateRandomIcons();
      cardList.value = [...examList]
      cardData.value = [...examData]
      wnogsData.value = [...examArr]
      correctIcon.value = correctIndex
      cardDom()
}
const cardDom = () => {
      if (cardsRef.value) {
            cardList.value.forEach((res, index) => {
                  // console.log(cardsRef.value[index]);
                  cardsRef.value[index].className = "card"
            })
      }
}
const init = async () => { // 初始化
      clearTime()
      cardList.value = []
      cardData.value = []
      wnogsData.value = []
      cardInit()
      time.value = TM1
      timeDesc.value = "记忆时间"
      timer.value = null
      cardFlip.value = ""
      progressValue.value = 0
    
      if (cardsRef.value) {
            cardList.value.forEach((res, index) => {
                  cardsRef.value[index].className = "card"
            })
      }
      isLock.value = 0
      startGame()
}
import { showToast } from "@/utils/message"
const startGame = () => {
      showToast("准备开始记忆啦~", 1000);
      console.log(isLock.value, '准备开始记忆啦');

      if (isLock.value === 0) {
            clearTime()
            isLock.value = 1
            cardFlip.value = "card-flipped"
            countdown()

      }
}

const countdown = () => {
      if (time.value === 0) {
            if (isLock.value === 1) {
                  cardFlip.value = ""
                  timeDesc.value = "倒计时"
                  time.value = TM2
                  console.log(time.value, '先倒计时');
                  clearTime()
                  startPlaying()
            } else {
                  console.log("再记忆");
                  timeDesc.value = '记忆'
                  time.value = TM1
                  clearTime()
                  showModal(8)
            }
      } else {
            console.log("isLock =》：", isLock.value, 'time 有值：', time.value, '进度条：', progressValue.value);
            if (isLock.value === 2 && time.value !== 0) {
                  Progress()
            }
            time.value--
            timer.value = setTimeout(() => {
                  countdown()
            }, 1000)
      }
}
const startPlaying = () => {
      setTimeout(() => {
            isLock.value = 2
            countdown()

      }, 2000)
}
let intervalId = ref(null)
const Progress = () => {
      if (progressValue.value < 100) {
            let num = 100 / TM2
            num = Number(num.toFixed(1))
            progressValue.value += num;
      }
      // intervalId.value = setInterval(() => {
      //       if (progressValue.value < 100) {
      //             let num = 100 / time.value
      //             num = Number(num.toFixed(1))
      //             progressValue.value += num;
      //       } else {
      //             clearInterval(intervalId.value);
      //       }
      // }, 1000);
}
const clearTime = () => {
      clearTimeout(timer.value)
      clearInterval(intervalId.value);
}
const showSelect = ref(false)
const showModalIndex = ref(null)
const showModal = (index) => {
      clearTime()
      showSelect.value = true
      showModalIndex.value = index
}
const cardSelectedArr = ref([])
const findCardData = ref([])
const questEvent = ref(null)
const cardClick = (questItem: object, card: string | number, cardIndex: string | number, index: number) => {
      if (isLock.value === 2) {
            let $fcards = cardsRef.value
            let $fcard = $fcards[index]
            if (cardData.value.every((item, index) => item.index !== cardIndex)) {
                  clearTime()
                  showModal(8)
                  modleDesc.value = "再次挑战"
                  return false
            }
            cardSelectedArr.value.push({ key: index, value: cardIndex })
            $fcards.className = "card"
            $fcard.className = "card card-flipped"
            if (list_active.value === questData.value.length) modleDesc.value = "恭喜你闯关成功"
            if (cardSelectedArr.value.length === 4) {
                  if (cardData.value.every((item, index) => item.index === cardSelectedArr.value[index].value)) {
                        questEvent.value = questItem
                        console.log("相等");
                        clearTime()
                        showModal(6)

                  } else {
                        console.log('有不相等的');
                        showModal(8)
                        // getQuest()
                        // init()

                  }
            }
      }
}
interface selectObj {
      isOp: boolean,
      userOption: string,
      event: object
}
const closeModal = () => {
      showModalIndex.value = null;
      showSelect.value = false
      if (isLock.value !== 0) {
            countdown();
      }
}
const selectClick = ({ isOp, userOption, event }: selectObj) => { // 选择题选项
      clearTime()
      findCardData.value.push({ ...event, userOption: userOption })
      if (isOp) {
            if (list_active.value === questData.value.length) {
                  showModalIndex.value = 8
                  modleDesc.value = "恭喜你闯关成功"
            } else {
                  showModalIndex.value = 7
            }
      } else {
            showModalIndex.value = 8

      }
}
const modleClick = () => { // 下一关
      clearTime()
      cardSelectedArr.value = []
      if (list_active.value < questData.value.length) {
            list_active.value++
      }
      showModalIndex.value = null;
      showSelect.value = false
      init()
}
const playAgain = (event: string) => { // 再次跳转/ 恭喜你闯关成功
      clearTime()
      if (event == '再次挑战') {
            cardSelectedArr.value = []
            cardList.value = []
            isPass.value = 0
            timeTotal()
            if (findCardData.value.length) {
                  submit()
            }
            closeModal()
            getQuest()
            list_active.value = 1
            init();
      } else {
            isPass.value = 1
            timeTotal()
      }
}

const timeTotal = () => { // 整体游戏时长
      endTime.value = new Date().getTime();
      totalTime.value = Math.floor((endTime.value - startTime.value) / 1000); // 计算整体秒数时间

}
const exanCardList = computed(() => {
      if (cardList.value.length) {
            return cardList.value
      }
})
onMounted(() => {
      getQuest()
      start()

})
</script>


<style scoped>
@import "./style.css";
</style>
