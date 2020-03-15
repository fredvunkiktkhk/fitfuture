<template>
    <div class="content">
        <div>Exercises will be here</div>
        <div class="wrapper">
            <div class="left-box">
                <div class="div1"></div>
                <div class="div2"></div>
                <div class="div3"></div>
                <div class="div4"></div>
                <div class="div5"></div>
                <div class="div6"></div>
            </div>

            <div class="right-box">
                <div class="div11"></div>
                <div class="div12"></div>
                <div class="div13"></div>
                <div class="div14"></div>
                <div class="div15"></div>
                <div class="div16"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Exercise',
        data: function () {
            return {}
        }
    };
</script>

<style scoped lang="scss">
    .content {
        width: 100%;
        margin: 0;
    }

    .right-box {
        position: absolute;
        top: 208px;
        right: -190px;
        width: 100%;
        height: 400px;
    }

    .left-box {
        position: absolute;
        top: 100px;
        left: -410px;
        width: 100%;
        height: 400px;
    }

    .div1 {
        position: absolute;
        left: 61.6%;
        right: 6.24%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.5) 12.66%, rgba(161, 84, 242, 0.5) 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
        box-shadow: inset 0 0 10px #fff;
    }

    .div2 {
        position: absolute;
        left: 60.42%;
        right: 7.42%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.6) 12.66%, rgba(161, 84, 242, 0.6) 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .div3 {
        position: absolute;
        left: 58.89%;
        right: 8.95%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.7) 12.66%, rgba(161, 84, 242, 0.7) 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .div4 {
        position: absolute;
        left: 57.22%;
        right: 10.61%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.9) 12.66%, rgba(161, 84, 242, 0.9) 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .div5 {
        position: absolute;
        left: 55.57%;
        right: 12.27%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, #F27A54 12.66%, #A154F2 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .div6 {
        position: absolute;
        left: 55.57%;
        right: 12.27%;
        top: 52.4%;
        bottom: 20.78%;
        background: linear-gradient(146.39deg, #F27A54 12.66%, #A154F2 93.04%);
        transform: rotate(-180deg);
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .div11 {
        position: absolute;
        left: 37.85%;
        right: 29.99%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.5) 12.66%, rgba(161, 84, 242, 0.5) 93.04%);
        border-radius: 6px;
    }

    .div12 {
        position: absolute;
        left: 39.03%;
        right: 28.81%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.6) 12.66%, rgba(161, 84, 242, 0.6) 93.04%);
        border-radius: 6px;
    }

    .div13 {
        position: absolute;
        left: 40.56%;
        right: 27.28%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.7) 12.66%, rgba(161, 84, 242, 0.7) 93.04%);
        border-radius: 6px;
    }

    .div14 {
        position: absolute;
        left: 42.22%;
        right: 25.61%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, rgba(242, 122, 84, 0.9) 12.66%, rgba(161, 84, 242, 0.9) 93.04%);
        border-radius: 6px;
    }

    .div15 {
        position: absolute;
        left: 43.88%;
        right: 23.96%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, #F27A54 12.66%, #A154F2 93.04%);
        border-radius: 6px;
    }

    .div16 {
        position: absolute;
        left: 43.88%;
        right: 23.96%;
        top: 25.59%;
        bottom: 47.6%;
        background: linear-gradient(146.39deg, #F27A54 12.66%, #A154F2 93.04%);
        border-radius: 6px;
    }
</style>