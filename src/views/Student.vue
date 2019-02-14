<template>
  <div class="student">
    <div class="st-top-bac" ref="top">
      <div class="st-badge">
        <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fz09zcywy9j305k05mmxv.jpg" alt="校徽">
      </div>
      <div class="st-top-title">学生数据库</div>
      <router-link to="/">
        <div class="st-back-home">返回</div>
      </router-link>
    </div>
    <div class="st-content-container">
      <student-head>
        <div class="chart-container" slot="st-data-img">
          <v-chart :options="allgrades"></v-chart>
        </div>
        <template slot="st-others">
          <student-compare :compareStudent="topFiveStudents"></student-compare>
        </template>
      </student-head>
      <student-overview>
        <template slot="student-overview">
          <v-chart :options="studentOverview"></v-chart>
        </template>
      </student-overview>
      <student-class @change="handleChangeSubject">
        <template slot="student-class">
          <v-chart :options="studentsGrade"></v-chart>
        </template>
      </student-class>
    </div>
  </div>
</template>
<script>
import StudentHead from "@/components/StudentHead.vue";
import StudentCompare from "@/components/StudentCompare.vue";
import StudentOverview from "@/components/StudentOverview.vue";
import StudentClass from "@/components/StudentClass.vue";
import axios from "axios";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/line";

export default {
  name: "student",
  components: {
    StudentHead,
    StudentCompare,
    StudentOverview,
    StudentClass
  },
  data() {
    return {
      subjects: [
        "Chinese",
        "Math",
        "English",
        "Physics",
        "Politics",
        "History"
      ],
      reData: [],
      allgrades: {
        title: {
          text: "各科成绩",
          textStyle: {
            color: "#006bb7",
            fontWeight: "normal"
          }
        },
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: "#616161"
            }
          },
          indicator: [
            { name: "数学", max: 120 },
            { name: "语文", max: 120 },
            { name: "英语", max: 120 },
            { name: "物理", max: 100 },
            { name: "政治", max: 100 },
            { name: "历史", max: 100 }
          ]
        },
        series: [
          {
            name: "student's grades",
            type: "radar",
            data: [
              {
                value: [],
                name: "grades"
              }
            ]
          }
        ]
      },
      labelOption: {
        normal: {
          show: true
        }
      },
      studentOverview: {
        color: ["#006699", "#4598e2", "#e5323e"],
        title: {
          text: "均分对比",
          textStyle: {
            color: "#006bb7",
            fontWeight: "normal"
          },
          left: 40
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["本人成绩", "校平均分", "班平均分"]
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          data: ["数学", "语文", "英语", "物理", "政治", "历史"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "本人成绩",
            type: "bar",
            barGap: 0,
            label: {},
            data: []
          },
          {
            name: "校平均分",
            type: "bar",
            barGap: 0,
            label: {},
            data: []
          },
          {
            name: "班平均分",
            type: "bar",
            label: {},
            data: []
          }
        ]
      },
      studentsGrade: {
        title: {
          text: "班内成绩",
          textStyle: {
            color: "#006bb7",
            fontWeight: "normal"
          },
          left: 40
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: true,
            length: 2
          },
          axisLabel: {
            rotate: 65,
            interval: "0",
            fontSize: 10,
            margin: 10,
            showMinLabel: true,
            showMaxLabel: true
          },
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最高分" },
                { type: "min", name: "最低分" },
                {
                  coord: [0, 0],
                  value: "我",
                  symbol: "circle",
                  symbolSize: [23, 23],
                  symbolOffset: [0, "-30%"]
                }
              ]
            },
            markLine: {
              data: [
                {
                  name: "平均分",
                  type: "average"
                }
              ]
            }
          }
        ]
      }
    };
  },
  computed: {
    studentsData() {
      var nameId = this.$route.params;
      return nameId;
    },
    activeStudent() {
      return this.$store.state.student;
    },
    schoolAverage() {
      return this.$store.state.schoolAverage;
    },
    activeClass() {
      return this.$store.getters.activeClass;
    },
    topFiveStudents() {
      return this.activeClass.slice(0, 5);
    }
  },
  methods: {
    handleTopScroll() {
      var op = window.scrollY / 120 > 1 ? 0 : 1 - window.scrollY / 120;
      this.$refs.top.style.opacity = op;
    },
    handleChangeSubject(subject) {
      this.studentsGrade.series[0].data = [];
      this.activeClass.forEach(value => {
        this.studentsGrade.series[0].data.push(value[subject]);
      });
      this.studentsGrade.series[0].markPoint.data[2].coord = [
        this.activeStudent.name,
        this.activeStudent[subject]
      ];
    },
    changeSutdentData() {
      var classes = this.subjects.slice(0);
      this.allgrades.series[0].data[0].value = [0, 0, 0, 0, 0, 0];
      this.allgrades.series[0].data[0].value.forEach((item, index, array) => {
        array[index] = this.activeStudent[classes[index]];
      });
      this.studentOverview.series[0].data = this.allgrades.series[0].data[0].value;
      this.studentsGrade.series[0].markPoint.data[2].coord = [
        this.activeStudent.name,
        this.activeStudent.Chinese
      ];
    },
    getImgData() {
      this.studentOverview.series.forEach(value => {
        value.label = this.labelOption;
      });
      // 全校平均分
      this.studentOverview.series[1].data = [0, 0, 0, 0, 0, 0];
      this.studentOverview.series[1].data.forEach((item, index, array) => {
        array[index] = this.schoolAverage[this.subjects[index]];
      });
      // 班级平均分
      var classAverage = this.subjects.slice(0);
      classAverage.forEach((value, index, array) => {
        var sum = 0;
        var count = this.activeClass.length;
        this.activeClass.forEach(item => {
          sum += item[value];
        });
        array[index] = Math.ceil(sum / count);
      });
      this.studentOverview.series[2].data = classAverage;
      // 将学生姓名设成横坐标
      this.activeClass.forEach(value => {
        this.studentsGrade.xAxis.data.push(value.name);
        this.studentsGrade.series[0].data.push(value.Chinese);
      });
      console.log(classAverage);
    }
  },
  mounted() {
    this.getImgData();
    this.changeSutdentData();
    // 鼠标滚动事件
    window.addEventListener("scroll", this.handleTopScroll);
  },
  updated() {
    this.changeSutdentData();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleTopScroll);
  }
};
</script>
<style lang="less" scoped>
  .student {
    .st-top-bac {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.6rem;
      background: linear-gradient(to top right, #cddc39, #8bc34a, #ffeb3b);
      display: flex;
      align-items: center;

      .st-badge {
        margin-left: 2rem;
        width: 1.4rem;
        height: 1.4rem;
        img {
          width: 100%;
          opacity: 0.45;
        }
      }
      .st-top-title {
        margin-left: 1rem;
        font-size: 0.56rem;
        color: #fff;
      }
      .st-back-home {
        font-size: 0.36rem;
        color: #fff;
        position: absolute;
        right: 1rem;
        cursor: pointer;
      }
    }
    .st-content-container {
      padding: 0.5rem 0.6rem;
    }
    .chart-container {
      position: relative;
      display: inline-block;
      padding: 0.15rem;
      min-width: 5rem;
      height: 6rem;
      .echarts {
        left: 0.2rem;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>


