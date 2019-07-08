
<template>
  <div class="block">
    <div>
      {{value1}}
    </div>
    <el-date-picker
      v-model="value1"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>


        <!-- 列表 -->
    <el-table
    id="out-table0"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    ref="filterTable"
    :data="tableData.slice((currpage - 1) * pageSize, currpage * pageSize)"
    style="width: 100%">
    <el-table-column
      prop="UID"
      label="星宿"
    >
    </el-table-column>
    <el-table-column
      prop="value"
      label="用户信息">
    </el-table-column>
    <el-table-column
      prop="date"
      :filters="[{text: '2010-05-02', value: '2011--05-02'}, {text: '2012-05-02', value: '2013-05-02'}, {text: '2014-05-02', value: '2015-05-02'}, {text: '2016-05-02', value: '2016-05-02'}]"
      :filter-method="filterHandler"
      label="注册时间">
    </el-table-column>
    <el-table-column
      prop="finadate"
      label="最后登录"
      sortable 
    >
    </el-table-column>
    <el-table-column
      prop="money"
      label="欠款"
      sortable>
    </el-table-column>
    <el-table-column
      prop="tree"
      label="诨名">
    </el-table-column>
  </el-table>
    <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currpage"
    :page-sizes="[6, 9, 12]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length">
  </el-pagination>
  </div>
</template>
 
<script>
    export default {
        data() {
            return {
                value1: '',
                pageSize: 6,//分页每页展示条数
                currpage: 1,//当前展示页码
                tableList: [],//数据存储数组
                tableData: [ //模拟数据 
                  {'value': '宋江','UID': '天魁星', 'date': '2010-05-02','finadate': '2011-6-7','money': '20000','tree': '及时雨、呼保义' },
          {'value': '卢俊义','UID': '天罡星', 'date': '2011-05-02','finadate': '2012-6-7','money': '20000','tree': '玉麒麟' },
          {'value': '吴用','UID': '天机星', 'date': '2012-05-02','finadate': '2012-6-7','money': '20000','tree': '智多星' },
          {'value': '公孙胜','UID': '天闲星', 'date': '2013-05-02','finadate': '2013-6-7','money': '20000','tree': '入云龙' },
          {'value': '关胜','UID': '天勇星', 'date': '2014-05-02','finadate': '2014-6-7','money': '20000','tree': '大刀' },
          {'value': '林冲','UID': '天雄星', 'date': '2015-05-02','finadate': '2015-6-7','money': '20000','tree': '豹子头' },
          {'value': '秦明','UID': '天猛星', 'date': '2016-05-02','finadate': '2016-6-7','money': '20000','tree': '霹雳火' },
          {'value': '呼延灼','UID': '天威星1', 'date': '2017-05-02','finadate': '2018-6-7','money': '20000','tree': '双鞭' },
          {'value': '花荣','UID': '天英星', 'date': '2018-05-02','finadate': '2017-6-7','money': '20000','tree': '小李广' },
          {'value': '柴进','UID': '天贵星', 'date': '2019-05-02','finadate': '2018-6-7','money': '20000','tree': '小旋风' },
          {'value': '李应','UID': '天富星', 'date': '2020-05-02','finadate': '2019-6-7','money': '20000','tree': '扑天雕' },
          {'value': '朱仝','UID': '天满星', 'date': '2000-05-02','finadate': '2020-6-7','money': '20000','tree': '美髯公' },
          {'value': '鲁智深','UID': '天孤星', 'date': '2001-05-02','finadate': '2021-6-7','money': '20000','tree': '花和尚' },
          {'value': '武松','UID': '天伤星', 'date': '2002-05-02','finadate': '2022-6-7','money': '20000','tree': '行者' },
          {'value': '董平','UID': '天立星/天健星', 'date': '2003-05-02','finadate': '2023-6-7','money': '20000','tree': '双枪将' },
          {'value': '张清','UID': '天捷星/天玄星', 'date': '2004-05-02','finadate': '2024-6-7','money': '20000','tree': '没羽箭' },
          {'value': '杨志','UID': '天暗星', 'date': '2005-05-02','finadate': '2025-6-7','money': '20000','tree': '青面兽' },
          {'value': '徐宁','UID': '天祐星/天佑星', 'date': '2006-05-02','finadate': '2026-6-7','money': '20000','tree': '金枪手' }, 
          {'value': '宋江','UID': '天魁星', 'date': '2007-05-02','finadate': '2027-6-7','money': '20000','tree': '及时雨、呼保义' },
          {'value': '卢俊义','UID': '天罡星', 'date': '2008-05-02','finadate': '2028-6-7','money': '20000','tree': '玉麒麟' },
          {'value': '吴用','UID': '天机星', 'date': '2009-05-02','finadate': '2029-6-7','money': '20000','tree': '智多星' },
          {'value': '公孙胜','UID': '天闲星', 'date': '2010-05-02','finadate': '2030-6-7','money': '20000','tree': '入云龙' },
          {'value': '关胜','UID': '天勇星', 'date': '2016-05-02','finadate': '2000-6-7','money': '20000','tree': '大刀' },
          {'value': '林冲','UID': '天雄星', 'date': '2016-05-02','finadate': '2001-6-7','money': '20000','tree': '豹子头' },
          {'value': '秦明','UID': '天猛星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '霹雳火' },
          {'value': '呼延灼','UID': '天威星1', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '双鞭' },
          {'value': '花荣','UID': '天英星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '小李广' },
          {'value': '柴进','UID': '天贵星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '小旋风' },
          {'value': '李应','UID': '天富星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '扑天雕' },
          {'value': '朱仝','UID': '天满星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '美髯公' },
          {'value': '鲁智深','UID': '天孤星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '花和尚' },
          {'value': '武松','UID': '天伤星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '行者' },
          {'value': '董平','UID': '天立星/天健星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '双枪将' },
          {'value': '张清','UID': '天捷星/天玄星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '没羽箭' },
          {'value': '杨志','UID': '天暗星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '青面兽' },
          {'value': '徐宁','UID': '天祐星/天佑星', 'date': '2016-05-02','finadate': '2018-6-7','money': '20000','tree': '金枪手' },  
                ]
            }
        },
        created() {
        },
        methods: {
                handleSizeChange(val) {
                  this.pageSize = val;
                    console.log(`每页 ${val} 条`);
                  },
                handleCurrentChange(val) {
                    this.currpage = val;
                    console.log(`当前页: ${val}`);
                  },
        }
    }
</script>