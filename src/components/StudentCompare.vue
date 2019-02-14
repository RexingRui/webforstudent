<template>
  <div class="student-compare">
    <div class="student-com-title">班级前五</div>
    <div class="student-com-container">
      <div class="other-column">
        <div class="first-student-com" v-for="item in firstColumn" :key="item.id"
         @click="handleStudentClick(item)">
          <img :src="item.img" :alt="item.name">
          <div class="name-masker">{{item.name}}</div>
        </div>
      </div>
      <div class="other-column">
        <div class="mid-student-com" @click="handleStudentClick(compareStudent[2])">
          <img :src="compareStudent[2].img" :alt="compareStudent[2].name">
          <div class="name-masker">{{compareStudent[2].name}}</div>
        </div>
      </div>
      <div class="other-column">
        <div class="end-student-com" v-for="item in endColumn" :key="item.id"
        @click="handleStudentClick(item)">
          <img :src="item.img" :alt="item.name">
          <div class="name-masker">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StudentCompare",
  props: {
    compareStudent: Array
  },
  data() {
    return { topFive: this.compareStudent };
  },
  computed: {
    firstColumn() {
      return this.topFive.slice(0, 2);
    },
    endColumn() {
      return this.topFive.slice(3, 5);
    }
  },
  methods: {
      handleStudentClick(item) {
          this.$router.push({name: "student", params: {id: item.id}});
          this.$store.commit("getActiveStudent", { student: item });
      }
  }
};
</script>
<style lang="less" scoped>
  .student-compare {
    padding: 0.15rem;
    .student-com-title {
      color: #006bb7;
      font-size: 0.38rem;
      margin-top: 0.12rem;
    }
    .student-com-container {
      margin-top: 0.2rem;
      display: flex;
      flex-wrap: wrap;
      .other-column {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .first-student-com,
        .mid-student-com,
        .end-student-com {
          width: 1.88rem;
          height: 1.88rem;
          border-radius: 50%;
          border: 1px solid #dedede;
          background: #f4f4f4;
          cursor: pointer;
          overflow: hidden;
          img {
            height: 100%;
            margin-left: -0.38rem;
          }
          .name-masker {
            display: none;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: relative;
            top: -1.88rem;
            text-align: center;
            line-height: 1.88rem;
            color: #fff;
            background: rgba(64, 130, 192, 0.7);
          }
          &:hover .name-masker {
            display: block;
          }
        }
      }
      .other-column:nth-child(1) {
        margin-bottom: -0.35rem;
      }
      .other-column:nth-child(3) {
        margin-top: -0.35rem;
      }
    }
  }
</style>
