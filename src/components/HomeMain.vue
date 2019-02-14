<template>
    <div class="main">
        <div class="main-container">
            <div class="main-header">
                <div class="main-side" @click="handleSideClick">
                    <i class="el-icon-menu"></i>
                </div>
                <div class="main-header-title">grades for students</div>
                <slot name="main-search"></slot>
                <div class="main-header-set">
                    <el-dropdown trigger="click" @command="handleCommand(a)">
                        <span class="el-dropdown-link">
                            <i class="el-icon-setting"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" placement="top">
                            <el-dropdown-item command="a">修改信息</el-dropdown-item>
                            <el-dropdown-item>切换账号</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                            <el-dropdown-item divided>联系作者</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="main-content-container">
                <div class="main-content">
                    <el-card v-for="item in students" :key="item.id">
                        <div class="s-img">
                            <img :src="item.img" class="image">
                        </div>
                        <div class="s-information">
                            <div class="s-overview">
                                <span class="s-name">{{item.name}}</span>
                                <span class="s-class">八年级{{item.classes}}班</span>
                            </div>
                            <div class="bottom clearfix">
                                <div class="s-rank">
                                    <span class="rank-c">C:{{item.cRank}}</span>
                                    <span class="rank-s">S:{{item.sRank}}</span>
                                </div>
                                <el-button
                                    type="text"
                                    class="button"
                                    @click="handleDetailClick(item)"
                                >查看详情</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomeMain",
    props: {
        students: Array
    },
    data() {
        return {
            a: 1
        };
    },
    methods: {
        handleSideClick() {
            this.$emit("clickmain");
        },
        handleCommand(command) {
            console.log(command);
        },
        handleDetailClick(student) {
            this.$store.commit("getActiveStudent", { student: student });
            this.$router.push({ name: "student", params: { id: student.id } });
        }
    }
};
</script>
<style lang="less" scoped>
.main {
    width: 100%;
    margin-left: 5.6rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    .main-container {
        position: relative;
        .main-header {
            position: fixed;
            z-index: 1;
            right: 0;
            left: 5.6rem;
            background: #fff;
            border-bottom: 1px solid #ddd;
            min-width: 320px;
            height: 1.2rem;
            display: flex;
            align-items: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            .main-side,
            .main-header-set {
                cursor: pointer;
                transform: scale(2);
                position: absolute;
                &:hover {
                    .el-dropdown-link {
                        color: #409efe;
                    }
                }
            }
            .main-side {
                left: 1rem;
            }
            .main-header-set {
                right: 0.85rem;
            }
            .main-header-title {
                position: absolute;
                left: 1.8rem;
                font-size: 0.5rem;
            }
            .main-search {
                position: absolute;
                left: 7.4rem;
            }
        }
        .main-content-container {
            min-height: 100vh;
            position: relative;
            padding-top: 1.8rem;
            background-color: #e6e7e9;
            .main-content {
                margin: 0 auto;
                padding: 0.5rem;
                max-width: 17rem;
                background: #fff;
                border-radius: 0.04rem;
                box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                .el-card /deep/ .el-card__body {
                    padding: 0;
                    height: 100%;
                }
                .el-card {
                    width: 5rem;
                    height: 5.8rem;
                    margin-bottom: 0.35rem;
                    &:hover {
                        .s-img {
                            transform: scaleX(1.2);
                        }
                    }
                    .s-img {
                        width: 100%;
                        height: 80%;
                        transition: all 0.2s ease-in-out;
                        .image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .s-information {
                        padding: 0.14rem;
                        .s-overview {
                            .s-class {
                                margin-left: 0.2rem;
                            }
                        }
                        .bottom {
                            margin-top: 0.2rem;
                            line-height: 0.24rem;
                            .s-rank {
                                font-size: 0.25rem;
                                color: #999;
                                .rank-s {
                                    margin-left: 0.12rem;
                                }
                            }
                            .button {
                                margin-top: -0.5rem;
                                float: right;
                            }
                        }
                    }
                    .clearfix:before,
                    .clearfix:after {
                        display: table;
                        content: "";
                    }
                    .clearfix:after {
                        clear: both;
                    }
                }
            }
        }
    }
}
.home.fold {
    .main {
        margin-left: 0;
        .main-container {
            .main-header {
                left: 0 !important;
            }
        }
    }
}
.home.phone {
    .main-container {
        .main-header {
            .main-side {
                left: 0.4rem;
            }
            .main-header-title {
                display: none;
            }
            .main-search {
                left: 1rem;
            }
            .main-header-set {
                right: 0.4rem;
            }
        }
    }
}
</style>

