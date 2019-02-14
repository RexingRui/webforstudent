<template>
    <div class="st-header">
        <div class="st-header-container">
            <div class="st-img st-head">
                <span class="img-container">
                    <img :src="activeStudent.img">
                </span>
                <span class="st-name">{{activeStudent.name}}</span>
                <span class="st-rank">排名: 班级{{activeStudent.cRank}}---全校{{activeStudent.sRank}}</span>
            </div>
            <div class="st-inf st-head">
                <span class="st-inf-title">学生信息</span>
                <span>班级: 八年级{{activeStudent.classes}}班</span>
                <span>性别：{{activeStudent.sex}}</span>
                <span>年龄：14</span>
                <span>爱好：篮球</span>
                <span>住址： 江南世家</span>
            </div>
            <div class="st-data st-head">
                <slot name="st-data-img"></slot>
            </div>
            <div class="st-other st-head">
                <slot name="st-others"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "StudentHead",
    computed: {
        activeStudent() {
            return this.$store.state.student;
        }
    }
};
</script>
<style lang="less" scoped>
.st-header {
    margin-top: 2rem;
    .st-header-container {
        width: 100%;
        min-width: 12rem;
        border: 1px solid #f1f4f5;
        min-height: 6.4rem;
        background: #f1f4f5;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        .st-head {
            width: 5.8rem;
            height: 6.2rem;
            border-top: 2px solid #5fade4;
            background: #fff;
            box-sizing: border-box;
        }
        .st-img {
            display: flex;
            flex-direction: column;
            align-items: center;
            .img-container {
                display: inline-block;
                width: 100%;
                height: 4.8rem;
                background: red;
                img {
                    width: 100%;
                    height: 4.8rem;
                }
            }
            .st-name, .st-rank {
                margin-top: 0.2rem;
            }
        }
        .st-inf {
            padding: 0.5rem;
            padding-top: 0.25rem;
            display: flex;
            flex-direction: column;
            color: #616161;
            span {
                font-size: 0.3rem;
                margin-bottom: 0.25rem;
            }
            .st-inf-title {
                font-size: 0.38rem;
                color: #006bb7;
            }
        }
    }
}
</style>
