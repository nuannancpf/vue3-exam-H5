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
                    <examMusic class="exam-music"></examMusic>
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
<script lang="ts" setup name="Exam">
import { ref, onMounted, nextTick, computed } from 'vue'
import examMusic from "./components/examMusic.vue"
import Propover from "./components/propover.vue"
import ExamSelect from "./components/examSelect.vue"
import ExamSuccessful from "./components/examSuccessful.vue"
import ExamAgain from "./components/examAgain.vue"
import { getQuestionList, submitQuestion } from "@/api/index"
const questData = ref([]) // 题库
const list_active = ref(1)
const getQuest = async () => {
    await getQuestionList().then(res => {
        console.log(res, '题库');
        const { code, data } = res
        if (code === 0) {
            questData.value = data
            // nextTick(() => {
            //     // init();
            //     startGame()
            // })
        }
    })
}
const isPass = ref(null)
const startTime = ref(null)
const endTime = ref(null)
const totalTime = ref(null) // 整体时间
const submit = async () => {
    let userId = localStorage.getItem('TOKEN')
    let data = {
        answerTime: totalTime.value,
        currentLevel: list_active.value,
        isPass: isPass.value,
        userId: userId,
        optionsList: findCardData.value
    }
    await submitQuestion(data).then((res) => {
        console.log(res);

    })
}
const [TM1, TM2] = [10, 60]
const cardsRef = ref()
const cardList = ref([]) // 卡牌数据
const cardFlip = ref("") // 卡牌翻转的样式
const isLock = ref(0)
const time = ref(TM1)
let timer = null // 计时器
const correctIcon = ref("")
const cardData = ref([]) // 正确的图标随机索引
const wnogsData = ref([]) // 其他的图标随机索引
const modleDesc = ref('再次挑战')
const start = () => {
    startTime.value = new Date().getTime();
}
const init = async () => {
    cardData.value = []
    wnogsData.value = []
    cardList.value = []
    time.value = TM1
    timeDesc.value = "记忆时间"
    timer = null
    cardFlip.value = ""
    progressValue.value = 0

    cardInit()
    if (cardsRef.value) {
        cardList.value.forEach((res, index) => {
            // console.log(cardsRef.value[index]);
            cardsRef.value[index].className = "card"
        })
    }
    initStatus(0)
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        startGame()
    }, 2000)

}
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
import { showToast } from "@/utils/message"

const startGame = () => {
    if (timer) {
        clearTimeout(timer)
    }
    showToast("准备开始记忆啦~", 1000);
    isLock.value = localStorage.getItem("CARD_ISLOCK");
    console.log('准备开始记忆啦   开始游戏 ', isLock.value);

    if (isLock.value == 0) {
        showModalIndex.value = null;
        showSelect.value = false
        initStatus(1)
        cardFlip.value = "card-flipped"
        console.log("游戏记忆  ", timer);

        if (timer) {
            console.log("准备开始记忆啦   开始游戏  之前清空 timer ");

            clearTimeout(timer);
        }
        //timer = setTimeout(() => {
        nextTick(() => {
            // cardFlip.value = "card-flipped"
            countdown()
        })
        // }, 2500)
    }
}
const timeDesc = ref("")
const countdown = () => {
    // console.log(isLock.value, '游戏记忆中， 准备开始', time.value);
    if (time.value === 0) {
        // if (isLock.value === 1 && !showSelect.value) {
        if (isLock.value === 1) {
            cardFlip.value = ""
            timeDesc.value = "倒计时"
            time.value = TM2
            console.log(time.value, '反面过去');
            startPlaying()
            return false
        }
        if (isLock.value === 0) {
            console.log('0000000000');
            return false
        }
        if (isLock.value == 2) {
            console.log('22222222222');
            timeDesc.value = "记忆时间"
            showModal(8)
        }
        // }
    } else {
        console.log(isLock.value, 'time 有值', time.value, 'showSelect -----', showSelect.value);
        time.value--;
        timer = null
        if (timer) {
            console.log('定时器锐减');

        }
        timer = setTimeout(() => {
            countdown()
        }, 1000)

    }
}
const startPlaying = () => {
    showToast("游戏开始，加油！");
    timer = null
    timer = setTimeout(function () {
        initStatus(2); // 更改状态
        countdown();
        timerP()
    }, 500);
    // initStatus(2); // 更改状态
    // countdown();
    // timerP()

}
const progressValue = ref(0)
let intervalId = null;
const timerP = () => {
    if (intervalId) {
        clearInterval(intervalId);  // 停止定时器  
    } else {
        intervalId = setInterval(() => {
            if (progressValue.value < 100) {
                progressValue.value += 3;
            } else {
                clearInterval(intervalId);
            }
        }, 1000);  // 每秒调用一次  
    }
    // if (timer) {
    //     clearInterval(timer);
    // }
    // timer = setInterval(() => {
    //     if (progressValue.value < 100) {
    //         progressValue.value += 3;
    //     } else {
    //         progressValue.value = 0


    //     }
    // }, 1000);
}
const showSelect = ref(false)
const showModalIndex = ref(null)
const cardSelectedArr = ref([])
const findCardData = ref([])
const questEvent = ref(null)
const cardClick = (questItem: object, card: string | number, cardIndex: string | number, index: number) => {
    console.log(isLock.value, '游戏状态 cardClick', card);
    if (isLock.value === 2) {
        let $fcards = cardsRef.value
        let $fcard = $fcards[index]
        if (cardData.value.every((item, index) => item.index !== cardIndex)) {
            showModal(8)

            modleDesc.value = "再次挑战"
            return false
        }
        cardSelectedArr.value.push({ key: index, value: cardIndex })
        $fcards.className = "card"
        $fcard.className = "card card-flipped"

        if (list_active.value === questData.value.length) modleDesc.value = "恭喜你闯关成功"
        console.log('进入');

        if (cardSelectedArr.value.length === 4) {
            timer = null
            timer = setTimeout(() => {
                if (cardData.value.every((item, index) => item.index === cardSelectedArr.value[index].value)) {
                    questEvent.value = questItem
                    console.log("相等");
                    if (timer) {
                        console.log('游戏中点击活动规则 暂停倒计时');
                        clearTimeout(timer); // 游戏中点击活动规则 暂停倒计时
                    }
                    showModal(6)

                } else {
                    console.log('有不相等的');
                    showModal(8)
                    // getQuest()
                    // init()

                }
            }, 400)
        }
    }
}
interface selectObj {
    isOp: boolean,
    userOption: string,
    event: object
}
const selectClick = ({ isOp, userOption, event }: selectObj) => { // 选择题按钮
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
        cardList.value = []
        // showModalIndex.value = null;
        // showSelect.value = false
        isPass.value = 0
        // getQuest()
        // init();
        // timeTotal()
        // nextTick(() => {
        //     submit()
        // })

    }
}
const modleClick = () => {
    showModalIndex.value = null;
    showSelect.value = false
    if (timer) {
        console.log('modleClick 的 定时器锐减');
        clearTimeout(timer);
    }
    cardSelectedArr.value = []
    if (list_active.value < questData.value.length) {
        list_active.value = list_active.value++
    }
    console.log(list_active.value);

    initStatus(0)
    init()
    // startGame()

}
const playAgain = (event: string) => {
    if (timer) {
        console.log('playAgain 的 定时器锐减');
        clearTimeout(timer);
    }
    if (event == '再次挑战') {
        cardSelectedArr.value = []
        initStatus(0)
        closeModal()
        getQuest()
        init();
        list_active.value = 1
        isPass.value = 0
        timeTotal()
        if (findCardData.value.length) {

            nextTick(() => {
                submit()
            })
        }
        return false
    }
    if (event == "恭喜你闯关成功") {
        isPass.value = 1
        timeTotal()
        return false
        // clearTimeout(timer)
        // timerP()
    }

}
const closeModal = () => { // 关闭遮罩层
    showModalIndex.value = null;
    showSelect.value = false
    isLock.value = localStorage.getItem("CARD_ISLOCK");
    if (isLock.value) {
        countdown();
    }
}
const showModal = (index: number | string) => {
    if (timer) {
        clearTimeout(timer); // 游戏中点击活动规则 暂停倒计时
    }
    showSelect.value = true
    showModalIndex.value = index
}
const timeTotal = () => {
    endTime.value = new Date().getTime();
    console.log(startTime.value, "startTime.value ==========>");

    console.log(endTime.value, 'endTime.value');

    totalTime.value = Math.floor((endTime.value - startTime.value) / 1000); // 计算整体秒数时间
    console.log(totalTime.value, "totalTime.value");

}
const initStatus = (status: number) => {
    isLock.value = status
    localStorage.setItem("CARD_ISLOCK", isLock.value)
}
const exanCardList = computed(() => {
    if (cardList.value.length) {
        return cardList.value
    }
})
onMounted(() => {
    getQuest()
    init()
    start()
})
</script>
<style lang="css" scoped>
@import "./style.css";
</style>
