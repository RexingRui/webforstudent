<template>
    <div class="student-class">
        <div class="student-class-container">
            <div class="subject-change">
                <span v-for="item in subjects" :key="item.id" class="student-subjects" @click="handleSubjectClick(item.name)">{{item.title}}</span>
            </div>
            <slot name="student-class"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "StudentClass",
    data () {
        return {
            subjects: [
                {id: 0, name: "Chinese", title: "语文" },
                {id: 1, name: "Math", title: "数学" },
                {id: 2, name: "English", title: "英语" },
                {id: 3, name: "Physics", title: "物理" },
                {id: 4, name: "Politics", title: "政治" },
                {id: 5, name: "History", title: "历史" },
                {id: 6, name: "total", title: "总分" }
            ]
        }
    },
    methods: {
        handleSubjectClick (name) {
            this.$emit("change", name);
        }
    }
};
</script>
<style lang="less" scoped>
.student-class {
    .student-class-container {
        margin: .5rem 0;
        width: 15.6rem;
        height: 8.8rem;
        padding: .42rem 0;
        border: 1px solid #f1f4f5;
        .subject-change {
            margin: 0 auto;
            margin-bottom: .26rem;
            width: 10.8rem;
            display: flex;
            justify-content: space-around;
            .student-subjects {
                width: 1.48rem;
                height: .72rem;
                background: #409EFF;
                text-align: center;
                line-height: .72rem;
                border-radius: .05rem;
                color: #f1f1f1;
                user-select: none;
                font-size: .32rem;
                cursor: pointer;
                &:hover {
                    opacity: .65;
                    color: rgb(209, 238, 44);
                }
            }
        }
    }
    .student-class-container /deep/ .echarts {
        margin-left: -.5rem;
        width: 100%;
        height: 90%;
    }
}
</style>


