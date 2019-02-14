<template>
    <div class="side">
        <div class="side-masker" v-show="sideMaskerShow" @click="handleMaskerClick"></div>
        <div class="side-inner">
            <div class="side-header">
                <div class="side-header-img">
                    <img
                        class="school-badge"
                        src="https://ws3.sinaimg.cn/large/006tNc79gy1fz09zcywy9j305k05mmxv.jpg"
                        alt
                    >
                </div>
                <div class="side-header-title">班级选择</div>
            </div>
            <div class="side-content">
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span>班级选择</span>
                        </template>
                        <el-menu-item
                            :index="'1-' + item.id"
                            v-for="item in classes"
                            :key="item.id"
                            @click="handleClassClick(item.id)"
                        >{{item.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-search"></i>
                        <span slot="title">班级搜索</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-star-off"></i>
                        <span slot="title">学习榜样</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-bell"></i>
                        <span slot="title">任务查询</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="side-footer">
                <div class="side-footer-img">
                    <img
                        src="https://ws4.sinaimg.cn/large/006tNc79gy1fz1j5kihk1j308s08p75d.jpg"
                        alt="二维码"
                    >
                </div>
                <div class="side-footer-title">欢迎探讨</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomeSide",
    props: {
        foldable: Boolean,
        isPhone: Boolean,
        classes: Array
    },
    computed: {
        sideMaskerShow() {
            if (this.isPhone && !this.foldable) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        handleMaskerClick() {
            this.$emit("clickside");
        },
        handleClassClick(classes) {
            this.$store.commit("changeClass", { classes: classes})
        }
    }
};
</script>
<style lang="less" scoped>
.side {
    height: 100%;
    background: #f4f5f5;
    border-right: 1px solid #ddd;
    width: 5.6rem;
    position: fixed;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    .side-masker {
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.3);
    }
    .side-inner {
        z-index: 1;
        background: #f0f1f4;
        position: relative;
        height: 100%;
        .side-header {
            height: 1.2rem;
            background: #fff;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            padding-left: 1rem;
            .side-header-img {
                width: 1rem;
                height: 0.8rem;
                .school-badge {
                    width: 90%;
                }
            }
            .side-header-title {
                position: absolute;
                left: 2rem;
                top: 0.4rem;
                font-size: 0.4rem;
            }
        }
        .side-content {
            height: calc(100% - 1.2rem);
            overflow-y: auto;
            user-select: none;
            .el-menu {
                border: none;
            }
        }
        .side-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 1.2rem;
            right: 0;
            z-index: 2;
            background: #f0f1f4;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .side-footer-img {
                width: 1rem;
                height: 1rem;
                img {
                    width: 100%;
                }
            }
            .side-footer-title {
                font-size: 0.34rem;
                position: relative;
                left: -1rem;
            }
        }
    }
}
.home.fold {
    .side {
        left: -5.6rem;
    }
}
</style>
