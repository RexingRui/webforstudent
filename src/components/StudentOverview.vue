<template>
    <div class="student-overview">
        <div class="data-container">
            <slot name="student-overview"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "StudentOverview",
}
</script>
<style lang="less" scoped>
.student-overview {
    .data-container {
        margin: .5rem 0;
        width: 15.6rem;
        height: 5.8rem;
        padding: .42rem 0;
        border: 1px solid #f1f4f5;
    }
    .data-container /deep/ .echarts {
        width: 100%;
        height: 100%;
        margin-left: -.5rem;
    }
}
</style>
