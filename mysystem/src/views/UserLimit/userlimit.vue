<template>
<div>
    <div class="title-UserList">
        <p class="storg">用户额度</p><br>
        <p>平台所有认证用户额度，额度与借款产品相匹配，可批量提额。</p>
    </div>
    <!-- 查询 -->
    <div class="filter-container">
      <!-- <el-input v-model="formData.UID" placeholder="UID" style="width: 200px;" class="filter-item" @keyup.enter.native="search(formData)" /> -->
      <el-input v-model="formData.date" placeholder="注册时间" style="width: 200px;" class="filter-item" @keyup.enter.native="search(formData)" />
      <!-- <el-input v-model="formData.name" placeholder="用户信息" style="width: 200px;" class="filter-item" @keyup.enter.native="search(formData)" /> -->
      <el-row class="demo-autocomplete">
        <el-autocomplete
          class="inline-input"
          v-model="formData.value"
          :fetch-suggestions="querySearch"
          placeholder="用户信息"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="search(formData)"
        ></el-autocomplete>

        <el-autocomplete
          class="inline-input"
          v-model="formData.money"
          :fetch-suggestions="querySearch"
          placeholder="额度"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="search(formData)"
        ></el-autocomplete>
    </el-row>
      
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search(formData)">
          查询
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="addFilter()">
          新增
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="resert()">
          刷新
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="exportExcel ()">
          导出
      </el-button>
    </div> 

    <!-- 列表 -->
    <el-table
    id="out-table0"
    v-loading="listLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    ref="filterTable"
    :data="tableList.slice((currpage - 1) * pageSize, currpage * pageSize)"
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑信息 -->
  <el-dialog title="修改信息" :visible.sync="dialogVisible">
    <el-form :model="selectTable">
        <el-form-item label="UID" label-width="100px">
            <el-input v-model="selectTable.UID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户信息" label-width="100px">
            <el-input v-model="selectTable.value"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" label-width="100px">
            <el-input v-model="selectTable.date"></el-input>
        </el-form-item>
        <el-form-item label="最后登录" label-width="100px">
            <el-input v-model="selectTable.finadate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额度" label-width="100px">
            <el-input v-model="selectTable.money"></el-input>
        </el-form-item>
        <el-form-item label="渠道" label-width="100px">
            <el-input v-model="selectTable.tree"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateShop">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 添加信息 -->
  <el-dialog title="添加信息" :visible.sync="addVisible">
      <el-form :model="addTable">
          <el-form-item label="星宿" label-width="100px"> 
              <el-input v-model="addTable.UID" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户信息" label-width="100px">
              <el-input v-model="addTable.value"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" label-width="100px">
              <el-input v-model="addTable.date"></el-input>
          </el-form-item>
          <el-form-item label="最后登录" label-width="100px">
              <el-input v-model="addTable.finadate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="欠款" label-width="100px">
              <el-input v-model="addTable.money"></el-input>
          </el-form-item>
          <el-form-item label="诨名" label-width="100px">
              <el-input v-model="addTable.tree"></el-input>
          </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="addList">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currpage"
    :page-sizes="[6, 9, 12]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableList.length">
  </el-pagination>
</div>

</template>

<script> 
import FileSave from 'file-saver' 
import XLSX from 'xlsx'
export default {
    inject: ['reload'],
    data() {
      return {
        dialogVisible: false,//编辑信息显示隐藏
        addVisible: false,//增加信息显示隐藏
        listLoading: false,//加载效果显示隐藏
        selectTable: {},//编辑信息显
        addTable: {},//增加信息
        pageSize: 6,//分页每页展示条数
        currpage: 1,//当前展示页码
         restaurants: [],
        formData: { //表单查询
            value: '',
            UID: '',
            date: '',
            money: ''
        },
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
    this.search({});
  },
    methods: {
      //编辑
      handleEdit(index, row) {
          this.selectTable = row;
          this.dialogVisible = true;
      },
      //删除
      handleDelete(index, row) {
        this.tableList.splice(index, 1);
      },
      //增加
      resetTemp() {
      this.addTable = {
          'UID': '',
          'date': '',
          'finadate': '',
          'value': '',
          'money': '',
          'tree': ''
      }
    },
      addFilter() {
        this.resetTemp() 
        this.addVisible = true
      },
      addList() {
          this.tableList.push(this.addTable)
          this.addVisible = false;
      },
      //页面刷新
      resert() {
          this.reload()
      },
      //确定
      updateShop() {
          this.dialogVisible = false;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
          console.log(`每页 ${val} 条`);
        },
      handleCurrentChange(val) {
          this.currpage = val;
          console.log(`当前页: ${val}`);
        },
      //查询
      search({UID, data, value}) {
          this.listLoading = true
          this.tableList =  this.tableData.filter(item => {
          let matchUID = true; // UID 筛选
          let matchdata = true; // data 筛选
          let matchvalue = true; // name 筛选

          if (UID) {
             // 模糊搜索;
            const ListUID = UID
              .replace(' ', '') // 删掉空格
              .split(''); // 切割成 单个字
            matchUID = ListUID.every(key => item.UID.includes(key));
          }
          if (data) {
            matchdata = item.data == data; 
          }
          if (value) {
            // 模糊搜索;
            const keys = value
              .toUpperCase() // 转大写
              .replace(' ', '') // 删掉空格
              .split(''); // 切割成 单个字

            matchvalue = keys.every(key => item.value.toUpperCase().includes(key));
          }
           // 加载动画定时关闭
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          return matchUID && matchdata && matchvalue;
        });
      },
      exportExcel () {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table0'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try { 
             FileSave.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '互腾.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) } 
         return wbout
     },
     //查询建议
      querySearch(queryString, cb) {
        var restaurants = this.tableList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>
<style>
  #out-table0{
      margin-top: 30px;
  }
  .title-UserList{
    height: 60px;
    padding: 20px;
    background-color: #fff;
  }
  .storg{
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
  .filter-container{
    margin-top: 20px;
  }
</style>

