<template>
    <div class="showModalSelect">
        <div class="modle">
            <div class="modal_header">
                <img src="../../../assets/doctor.png" class="modal_img">
            </div>
            <div class="select-body">

                <div class="top">
                    <div class="top-title">
                        小课堂
                    </div>
                </div>
                <span class="question_text">{{ questEvent.question }}</span>
                <div class="quest_question">
                    <div class="question">
                        <div v-for="(quest, index) in questEvent.optionsList" :key="quest.id" class="quest" @click="questClick(questEvent, quest)" :class="{ 'questAcyive': checked === quest.options }">
                            <span>{{ quest.options }}.</span>
                            <span>{{ quest.optionsValue }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup name="ExamSelect">
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
    questEvent: Object
})
const checked = ref('')
const emits = defineEmits(["select-click"])
const questClick = (item: object, event: object) => {
    console.log('questClick--->');


    checked.value = event.options
    if (item.answer == event.options) {
        emits("select-click", { isOp: true, userOption: event.options, event: event })
    } else {
        emits("select-click", { isOp: false, userOption: event.options, event: event })
    }

}
</script>
<style lang="less" scoped>
.showModalSelect {
    position: fixed;
    top: 205px;
    left: 11%;
    z-index: 2023;
    width: 295px;
    min-height: 257px;
    // background-image: url("../../assets/Group_901.png");
    // background-size: cover !important;
    // background-repeat: no-repeat;

}

.modle {
    // width: 303px;
    // height: 257px;
    width: 100%;
    height: auto;
    // background-image: url("../../../assets/doctor.png") !important;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #fff;
    border-radius: 16px 16px 16px 16px;
    // align-items: flex-end;
}

.modal_header {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -63px;
    left: 50%;
    transform: translateX(-50%);

    .modal_img {
        width: 65px;
        height: 76px;
    }
}

.select-body {
    width: 100%;
    height: 100%;
    // height: calc(100% - 69px);
    margin: 15px 0 0;
    padding: 0 10px 39px;

    .top {
        display: flex;
        justify-content: center;

        .top-title {
            width: 100px;
            height: 27px;
            background: #117BD6;
            border-radius: 40px 40px 40px 40px;
            opacity: 1;

            font-size: 16px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            text-align: center;
            // line-height: 19px;
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }
    }

    .question_text {
        margin: 20px 0 0;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        color: #3A3A3A;
        // line-height: 19px;
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }

    .quest_question {
        display: flex;
        justify-content: center;
        margin: 44px 0 0;

        .question {
            display: flex;
            gap: 20px;

            .quest {
                width: 70px;
                // height: 27px;
                background: #DFF0FF;
                border-radius: 5px 5px 5px 5px;
                opacity: 1;
                text-align: center;
                padding: 5px 0;

                span {
                    font-size: 12px;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    color: #117BD6;
                    // line-height: 14px;
                    // -webkit-background-clip: text;
                    // -webkit-text-fill-color: transparent;
                }
            }

            .questAcyive {
                background: #117BD6;
                border-radius: 5px 5px 5px 5px;
                opacity: 1;

                span {
                    font-size: 12px;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 14px;
                }
            }
        }

    }

}
</style>
