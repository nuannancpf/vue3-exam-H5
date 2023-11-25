<template>
    <div class="load">
        <div class="load_top">
            <div class="laod_text">2023年世界艾滋病日宣传主题</div>
            <div class="frame_imag"><img src="../../assets/Frame.png" class="Frame"></div>
            <div class="border">
                <div class="load_border"></div>
            </div>
        </div>

        <div class="load_txt">
            <div>
                <div class="load_txt_">
                    <div><img src="../../assets/Rectangle245.png">找图标</div>
                    <div class="lasd_div"><img src="../../assets/Rectangle245.png">拼记忆</div>
                </div>
                <div class="load_txt_">
                    <div><img src="../../assets/Rectangle245.png">献爱心</div>
                    <div class="lasd_div"><img src="../../assets/Rectangle245.png">享幸运</div>
                </div>
            </div>

        </div>
        <div class="load_Progress ">
            <div class="Group903">
                <div class="progress-bar">
                    <div class="progress" :style="{ width: value + '%' }"></div>
                </div>
            </div>

        </div>
        <div class="load_loading">
            <span>LOADING {{ value }}%</span>
        </div>
        <div class="load_bottom_img">
            <img src="../../assets/Slice3@2x.png" class="slice3">
        </div>
    </div>
</template>

<script lang="ts" setup name="Load">
import { onMounted, ref } from 'vue';
const value = ref(0);
import { useRouter } from 'vue-router'
const router = useRouter()
const timer = () => {
    setInterval(() => {
        if (value.value < 100) {
            value.value += 10;
        } else {
            router.push({ path: "/login" })
            clearInterval(timer);
            
        }
    }, 50);
}

onMounted(() => {
    // 在组件挂载时启动计时器
    timer();
});
</script>
<style lang="less" scoped>
.load {
    position: relative;
    height: 100vh;
    background-image: url("../../assets/Slice2@2x.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-clip: content-box;

    .load_top {
        padding: 90px 0 0;

        // display: flex;
        .laod_text {
            text-align: center;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            color: #3A3A3A;
            line-height: 14px;
            letter-spacing: 6px;
            -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }

        .frame_imag {

            margin: 16px 0 0;
            display: flex;
            justify-content: center;
            .Frame {
                width: 261px;
            }
        }

        .border {
            display: flex;
            justify-content: center;
            margin: 20px 0 0;
        }

        .load_border {
            width: 45px;
            height: 0px;
            opacity: 1;
            border: 6px solid #117BD6;
        }
    }

    .load_txt {
        margin: 115px 0 0;
        display: flex;
        justify-content: center;

        .load_txt_ {
            width: 210px;
            display: flex;
            justify-content: space-between;

            &:first-child {
                margin: 0 0 24px;
            }

            &:last-child {
                margin: 0 0 51px;

                div {
                    text-align: right;
                }
            }

            .lasd_div {
                display: flex;
                justify-content: flex-end;
            }

            div {
                width: 50%;
                display: flex;
                align-items: center;
                font-size: 16px;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                color: #3A3A3A;
                line-height: 14px;
                letter-spacing: 6px;
                -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;

                img {
                    width: 9px;
                    height: 9px;
                    margin-right: 3px;
                }
            }
        }
    }

    .load_Progress {
        height: auto;
        display: flex;
        justify-content: center;

        .Group903 {
            width: 194px;
            height: 19px;
            background-image: url("../../assets/Group903.png");
            background-repeat: no-repeat;
            background-size: contain;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .load_loading {
        margin: 13px 0 0;
        text-align: center;
        font-size: 16px;
        font-family: DIN, DIN;
        font-weight: 500;
        color: #E42A24;
        line-height: 14px;
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }

    .load_bottom_img {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        .slice3 {
            width: 100%;
        }

    }



}

.progress-bar {
    width: 95%;
    height: 15px;
    // border: 1px solid #ccc;
    border-radius: 7px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background-color: #fff;
    transition: width 0.5s ease-in-out;
}
</style>
