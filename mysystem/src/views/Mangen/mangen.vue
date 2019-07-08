<template>
    <div>
        <el-row :gutter="40"> 
            <el-col :span="8">
                <div class="grid-content grid1">
                    <div class="shopCoin">
                        <img src="../../assets/img/eyes.png">
                    </div>
                    <div class="money">
                        <div>
                            <span class="coin">数据费余额</span><br>
                            <span class="Scoin">￥139</span>
                        </div>
                    </div>
                    <div class="recharge">
                        <a href="#">充值</a>
                    </div>
                    
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid1">
                    <div class="shopCoin">
                        <img src="../../assets/img/eyes.png"> 
                    </div>
                    <div class="money">
                        <div>
                            <span class="coin">米钻余额</span><br>
                            <span class="Scoin">5,748 个</span>
                        </div>
                    </div>
                    <div class="recharge">
                        <a href="#">充值</a>
                    </div>
                    
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content grid1">
                    <div class="shopCoin">
                        <img src="../../assets/img/eyes.png">
                    </div>
                    <div class="money">
                        <div>
                            <span class="coin">三方支付余额</span><br>
                            <span class="Scoin">￥0.00</span>
                        </div>
                    </div>
                    <div class="recharge">
                        <a href="#">充值</a>
                    </div>
                    
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20"> 
            <el-col :span="6">
                <div class="grid-content">
                    <span class="coin">总放款金额</span>
                    
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <span class="coin">总注册人数</span>
                    
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <span class="coin">总放款笔数</span>
                    
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <span class="coin">今日到期应还本金</span>
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
  .grid-content {
      background-color: #ffffff;
      height: 150px;
  }
  .el-row {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .el-row :last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    
  }
  .coin{
      color: rgba(0,0,0,.45);
      font-size: 14px;
  }
  .Scoin{
      font-size: 30px;
  }
  .grid1{
      display: flex;
      justify-content: space-around;
  }
  .shopCoin{
      display: flex;
      align-items: center;
  }
  .money{
      display: flex;
      align-items: center;
      text-align: center;
  }
  .recharge{
      padding-top: 20px;
      color: #1890ff;
      outline: none;
  }
</style>

