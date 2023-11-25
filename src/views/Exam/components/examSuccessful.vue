<template>
    <div class="showModalSelect">
        <div class="modle">
            <div class="select-body">
                <div class="top">
                    <div class="top-title">
                        小课堂
                    </div>

                </div>
                <div class="modle_imag">
                    <img src="../../../assets/Group902.png" class="image">
                </div>
                <div class="modle_text"><span>回答成功</span></div>
                <div class="modle_button">
                    <div class="button">
                        <van-button color="#117BD6" round type="primary" class="button-primary" @click="nextQuest">下一关</van-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup name="ExamSuccessful">
import { ref, onMounted, defineProps, defineEmits } from 'vue'

const emit = defineEmits(["modleClick"])
const checked = ref('')
const nextQuest = () => {
    emit("modleClick")
}
</script>
<style lang="less" scoped>
.showModalSelect {
    position: fixed;
    top: 205px;
    left: 11%;
    z-index: 2023;
    width: 295px;
    height: 257px;
    // background-image: url("../../assets/Group_901.png");
    // background-size: cover !important;
    // background-repeat: no-repeat;

}

.modle {
    // width: 303px;
    // height: 257px;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/Group_901.png") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    display: flex;
    align-items: flex-end;
}

.select-body {
    width: 100%;
    height: calc(100% - 69px);
    padding: 0 10px;

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

    .modle_imag {
        display: flex;
        justify-content: center;
        margin: 7px 0 6px;
        .image {
            width: 65px;
            height: 58px;
        }
    }
    .modle_text{
        text-align: center;
    }

}

.modle_button {
    margin: 17px 0 30px;

    .button {
        display: flex;
        justify-content: center;
    }

    .button-primary {
        width: 142px;
    }

}
</style>
