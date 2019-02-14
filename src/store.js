import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from "vuex-along"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classes: 1,
    studentsData: {},
    schoolAverage: {},
    student: {}
  },
  mutations: {
    changeClass (state, payload) {
      state.classes = payload.classes;
    },
    getStudentsData (state, payload) {
      state.studentsData = payload.studentsData;
      state.schoolAverage = payload.schoolAverage;
    },
    getActiveStudent (state, payload) {
      state.student = payload.student;
    }
  },
  getters: {
    activeClass: state => {
      var classNum = state.student.classes;
      if (state.studentsData) {
        return state.studentsData["class" + classNum];
      }
    }
  },
  plugins: [vuexAlong]
})
