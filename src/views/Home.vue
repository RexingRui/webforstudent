<template>
    <div class="home" :class="{fold: foldable, phone: isPhone}">
        <div class="home-container">
            <home-side
                :foldable="foldable"
                :isPhone="isPhone"
                @clickside="handleSideClick"
                :classes="classes"
            ></home-side>
            <home-main @clickmain="handleSideClick" :students="students">
                <div class="main-search" slot="main-search">
                    <el-input v-model="studentName" placeholder="请输入学生姓名" size="small" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="handleSearchClick"></el-button>
                    </el-input>
                </div>
            </home-main>
        </div>
    </div>
</template>
<script>
import HomeSide from "@/components/HomeSide.vue";
import HomeMain from "@/components/HomeMain.vue";
import util from "@/common/index.js";
import axios from "axios";

export default {
    name: "home",
    components: {
        HomeSide,
        HomeMain
    },
    data() {
        return {
            foldable: false,
            isPhone: false,
            screenWidth: document.body.scrollWidth,
            studentName: "",
            studentData: {},
            classes: [
                { id: 1, name: "八年级1班" },
                { id: 2, name: "八年级2班" },
                { id: 3, name: "八年级3班" },
                { id: 4, name: "八年级4班" },
                { id: 5, name: "八年级5班" },
                { id: 6, name: "八年级6班" },
                { id: 7, name: "八年级7班" },
                { id: 8, name: "八年级8班" },
                { id: 9, name: "八年级9班" },
                { id: 10, name: "八年级10班" },
                { id: 11, name: "八年级11班" },
                { id: 12, name: "八年级12班" }
            ],
            students: []
        };
    },
    methods: {
        handleSideClick() {
            this.foldable = !this.foldable;
        },
        getStudentsInfo() {
            axios.get("/api").then(this.getStudentsInfoSucc);
        },
        getStudentsInfoSucc(res) {
            var res = res.data;
            if (res) {
                var data = util.dataProcess(res);
                this.studentData = data.data;
                this.students = this.studentData["class1"].slice(0, 9);
                this.$store.commit("getStudentsData", {studentsData: this.studentData, schoolAverage: data.averageGrade});
            }
        },
        handleSearchClick() {
            var searchStudent = [];
            var _this = this;

            for (let item in this.studentData) {
                var sameStudent = this.studentData[item].filter(value => {
                    return value.name == _this.studentName;
                });
                if (sameStudent.length > 0) {

                    sameStudent.forEach(value => {
                        searchStudent.push(value);
                    });
                }
            }
            if (searchStudent.length > 0) {
                this.students = searchStudent;
            }
        }
    },
    computed: {
        classNum() {
            return this.$store.state.classes;
        }
    },
    watch: {
        classNum(newclassNum) {
            this.students = this.studentData["class" + newclassNum].slice(
                0,
                9
            );
        }
    },
    created() {
        this.foldable = window.screen.width < 700 ? true : false;
        this.isPhone = window.screen.width < 700 ? true : false;
    },
    mounted() {
        this.getStudentsInfo();
    }
};
</script>
<style lang="less" scoped>
.home {
    position: relative;
    overflow: hidden;
    .home-container {
        position: relative;
        display: flex;
        .main-search {
         /deep/ input {
                width: 180px;
            }
        }
    }
}
.home.phone {

}
</style>

