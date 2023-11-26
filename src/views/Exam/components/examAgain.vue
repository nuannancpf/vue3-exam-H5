<template>
    <div class="examAgain">
        <div class="modle">
            <div class="model_body">
                <div class="model_header">
                    <span>时间到了哟~</span>
                </div>
                <div class="modle_button">
                    <div class="button">
                        <van-button color="#117BD6" round type="primary" class="button-primary" @click="playAgain(modleDesc)">{{ modleDesc }}</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="ExamAgain">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
    modleDesc: String
})
const emit = defineEmits(["modleClick"])
const playAgain = (modleDesc:string) => {
    emit('modleClick', modleDesc)
}
</script>
<style lang="less" scoped>
.examAgain {
    position: fixed;
    top: 205px;
    left: 11%;
    z-index: 2023;
    width: 295px;
    height: 257px;
}

.modle {
    // width: 303px;
    // height: 257px;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/Group901.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
}

.model_body {
    width: 100%;
    height: calc(100% - 46px);
    padding: 0 10px;
}

.model_header {
    text-align: center;

    span {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        color: #3A3A3A;
        line-height: 19px;
    }
}

.modle_button {
    margin: 114px 0 30px;

    .button {
        display: flex;
        justify-content: center;
    }

    .button-primary {
        width: 142px;
    }

}
</style>
