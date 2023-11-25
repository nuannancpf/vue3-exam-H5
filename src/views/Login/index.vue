<template>
    <div class="login">
        <div class="backgroun_icon"> <img src="@/assets/Group898.png" alt="" class="Group898"></div>
        <div class="txt">
            <!-- <div> -->
            <img src="@/assets/Group749.png" alt="" class="Group749">
            <!-- <div class="group749"></div> -->
            <div class="text">玩游戏 · 赢话费</div>
            <!-- </div> -->
        </div>
        <div class="modle-icon">
            <div class="modle">
                <!-- 输入手机号，调起手机号键盘 -->
                <input v-model="phone" type="tel" class="tel-field" placeholder="请输入手机号" />
            </div>

        </div>
        <div class="modle-text">
            温馨提示：手机号用于通关后领取奖励
        </div>
        <div class="button">
            <van-button color="#117BD6" round type="primary" class="button-primary" @click="loginClick" :disabled="phone ? false : true">开始接力</van-button>
            <!-- <router-link to="/exam">开始接力</router-link> -->
        </div>
    </div>
</template>
<script setup lang="ts" name="Login">
import { ref } from 'vue'
import { showNotify } from 'vant';
// 显示提示框
import { showToast } from "@/utils/message"
const phone = ref("")

import { userLogin } from "@/api/index"

import { useRouter } from 'vue-router'
const router = useRouter()
const loginClick = async () => {
    // router.push({ path: "/examcard" })
    let telReg = !!phone.value.match(
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    );
    if (!phone.value) {
        showToast("请输入手机号码~");
        return false
    } else if (phone.value.length != 11 || telReg == false) {
        showToast("手机号码格式错误~");
        return false
    }
    let data = {
        phone: phone.value
    }
    await userLogin(data).then(res => {

        const { code, data, msg } = res
        if (code === 0) {
            // router.push({ path: "/exam" })
            router.push({ name: 'exam' })
            const userId = data?.userId
            localStorage.setItem("TOKEN", userId)
            console.log(res, '开始经理');
        } else {
            showNotify({ type: 'danger', message: msg });
        }

    })
}
</script>
<style lang="less" scoped>
.login {
    position: relative;
    height: 100vh;
    /* background-color: #2ec7e4; */
    /* width: 375px; */
    /* height: 812px; */
    /* background: #F3F0EB; */
    background-image: url("../../assets/Slice2@2x.png");
    background-size: cover;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    background-clip: content-box;

    // padding: 5px 0 0;
    /* background-position: center; */
    /* background-size: contain; */
    /* border-radius: 0px 0px 0px 0px; */
    .backgroun_icon {
        width: 100%;

        // height: auto;
        // background-image: url('@/assets/Group898.png');
        // // background-position: center center, top left;
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        // background-clip: content-box;
        // background-position-y: 12px;
        // z-index: 2023;
        .Group898 {
            width: 100%;
        }
    }

    .txt {
        // width: 100%;
        //     height: 100%;
        //     background-image: url("@/assets/Group749.png");
        //     background-repeat: no-repeat;
        //     background-size: contain;
        display: flex;
        justify-content: center;
        align-content: center;
        margin: 12px 0 0;

        .Group749 {
            width: 38px;
            height: 38px;
            margin-right: 14px;
        }

        .text {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            color: #3A3A3A;
            line-height: 14px;
            -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }
    }

    .modle-icon {
        display: flex;
        justify-content: center;
    }

    .modle {
        width: 319px;
        height: 47px;
        background-image: url("../../assets/Group899.png");
        background-size: cover;
        background-repeat: no-repeat;
        /* background-attachment: fixed; */
        background-clip: content-box;
        margin: 56px 0 0;
        display: flex;
        justify-content: center;

        .tel-field {
            width: 90% !important;
            padding: 10px 5px 0 !important;
            height: 40px;
            // border: 1px solid #000;
        }


    }

    .modle-text {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        color: #FE5E59;
        line-height: 14px;
        -webkit-background-clip: text;
        margin: 12px 0 0;
        text-align: center;
        // -webkit-text-fill-color: transparent;
    }

    .button {

        // position: fixed;
        // bottom: 96px;
        // right: 0;
        // left: 0;
        margin-top: 203px;
        display: flex;
        justify-content: center;

        .button-primary {
            width: 205px;
        }

    }
}
</style>
