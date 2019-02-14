/**
 * 排名处理函数
 * @param {Array} data
 */
function dataProcess(data) {
    // 深拷贝原始数据使其不受处理影响
    data = JSON.parse(JSON.stringify(data));
    // 添加总分项并计算平均分
    var averageGrade = {Math: 0, Chinese: 0, English: 0, Physics: 0, Politics: 0, History: 0};
    data.forEach((value, index, array) => {
        value.Chinese = Math.ceil(value.Chinese);
        value.Math = Math.ceil(value.Math);
        value.English = Math.ceil(value.English);
        value.Physics = Math.ceil(value.Physics);
        value.Politics = Math.ceil(value.Politics);
        value.History = Math.ceil(value.History);
        averageGrade.Math += value.Math;
        averageGrade.Chinese += value.Chinese;
        averageGrade.English += value.English;
        averageGrade.Politics += value.Politics;
        averageGrade.Physics += value.Physics;
        averageGrade.History += value.History;

        var totalGrades =
            value.Chinese +
            value.Math +
            value.English +
            value.Physics +
            value.Politics +
            value.History;
        value.total = totalGrades;
    });
    for (let item in averageGrade) {
        averageGrade[item] = Math.ceil(averageGrade[item] / data.length);
    }
    // 总分排序
    data = data.sort((numA, numB) => {
        return numB.total - numA.total;
    });
    // 进行全校总分排名，并将排名项写入每个学生的信息中
    data = studentRank(data, "sRank");
    // 将数据写成以班级为健值对的对象形式
    data = divideClasses(data);
    // 进行班级内总分排名，并将排名项写入每个学生的信息中
    for (let item in data) {
        data[item] = studentRank(data[item], "cRank");
    }
    var backData = {
        averageGrade: averageGrade,
        data: data
    };

    /**
     * 以班级为单位重新优化数据格式
     * @param {Array} data
     */
    function divideClasses(data) {
        var newData = {};
        data.forEach(value => {
            if (!newData["class" + value.classes]) {
                newData["class" + value.classes] = [];
            }
            newData["class" + value.classes].push(value);
        });
        return newData;
    }

    /**
     * 分数排名
     * @param {Array} data
     * @param {String} rank
     */
    function studentRank(data, rank) {
        var data = data || [];
        var count = 0;

        data.forEach((value, index, array) => {
            if (array[index - 1] && array[index - 1].total == value.total) {
                value[rank] = array[index - 1][rank];
                count++;
            } else {
                value[rank] = index + 1 - count;
            }
        });
        return data;
    }
    return backData;
}

export default dataProcess;
