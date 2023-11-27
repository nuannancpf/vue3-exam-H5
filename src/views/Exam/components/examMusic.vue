<template>
      <div class="music-view cp">
            <div id="musicIcon" class="music-icon" :class="isPlay ? 'play-style' : ''" @click="togglePlay">
                  <img src="../../../assets/Group749.png" alt="">
                  <!-- <div v-if="tipStatus" class="tip is-show">点击播放</div> -->
            </div>
            <audio class="audio" :src='url' :autoplay="false" loop ref="player" :preload="false" @ended="ended">
            </audio>
      </div>
      <!-- @canplay="togglePlay" -->
      <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
      <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）-->
      <!--preload：属性规定是否在页面加载后载入音频-->
      <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
      <!--timeupdate：当目前的播放位置已更改时-->
      <!--ended：当目前的播放列表已结束时-->
</template>
<script>
export default {
      name: 'examMusic',
      data() {
            return {
                  // url: 'https://www.xitieba.com/upload/music/20170904/E6QF0H.mp3',
                  url: 'https://wwdui.oss-cn-shanghai.aliyuncs.com/music4.mp3',
                  isPlay: false, // 播放状态
                  changeTime: 0, // 指定播放时刻
                  autoNext: false, // 用于触发自动播放下一首
                  tipStatus: true
            }
      },
      watch: {
            // 监听播放还是暂停
            isPlay: function () {

            },
            // 跳到指定时刻播放
            changeTime: function () {
                  let player = this.$refs.player
                  player.currentTime = this.changeTime
            }
      },
      mounted() {
            // this.isPlay = false
            // this.togglePlay()
      },
      methods: {
            // 开始/暂停
            togglePlay() {
                  let player = this.$refs.player
                  if (!this.isPlay) {
                        player.play()
                        console.log('播放')
                        this.isPlay = true
                        this.tipStatus = false
                  } else {
                        console.log('暂停')
                        player.pause()
                        this.isPlay = false
                        this.tipStatus = true
                  }
                  console.log('tipStatus-', this.tipStatus)
            },
            // 音乐播放时记录音乐的播放位置
            timeupdate() {
                  let player = this.$refs.player
            },
            // 音乐播放结束时触发
            ended() {
                  console.log('音乐播放结束时触发')
                  this.isPlay = false
            }
      }
}
</script>
<style lang="less" scoped>
.music-view {
      width: 35px;
      height: 35px;
      position: fixed;
      right: 10px;
      top: 10px;
      z-index: 999;

      .music-icon {
            width: 100%;
            height: 100%;
            border-radius: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
                  width: 30px;
                  height: 30px;
            }

            .tip {
                  width: 54px;
                  padding: 6px 4px;
                  line-height: 1.2;
                  background: #303133;
                  color: #fff;
                  border-radius: 4px;
                  text-align: center;
                  font-size: 12px;
                  position: absolute;
                  transition: left .3s;
                  right: 42px;
                  top: 10px;
            }

            .tip::after {
                  content: "";
                  display: block;
                  position: absolute;
                  right: -12px;
                  top: 6px;
                  border: 6px solid transparent;
                  border-left-color: #303133;
            }
      }

      .audio {
            width: 35px;
            height: 35px;
            z-index: -1;
            position: fixed;
            right: -300px;
            opacity: 0;
      }

      .play-style {
            animation: Music_rotate 1000ms linear infinite;
      }

      @keyframes Music_rotate {
            0% {
                  -webkit-transform-origin: center center;
                  transform-origin: center center;
                  transform: rotate(0deg);
            }

            100% {
                  -webkit-transform-origin: center center;
                  transform-origin: center center;
                  transform: rotate(360deg)
            }
      }
}
</style>
