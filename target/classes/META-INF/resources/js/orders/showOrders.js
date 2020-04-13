layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //日期时间范围
    laydate.render({
        elem: '#test3'
        ,type: 'datetime'
        /*,format:'yyyy/MM/dd HH:mm:ss'*/
        ,range: true  //开启范围选择
    });

    //订单信息的方法级渲染
    table.render({
        elem: '#demo' //数据存放的容器，为table标签，其id="demo"
        ,height: 412
        ,url: 'orders/loadPageByParams'
        ,limit:5
        ,limits:[5,10,15,20,25]
        ,even:true
        ,page: true
        ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
            ,{field: 'orderNum', title: '订单编号', align:'center',width:240, sort: true}
            ,{field: 'customerName', title: '客人名称', width:120, align:'center',sort: true,templet:'<div>{{d.inRoomInfo.customerName}}</div>'}
            ,{field: 'idcard', title: '身份证号', width:220,align:'center',templet:'<div>{{d.inRoomInfo.idcard}}</div>'}
            ,{field: 'vip', title: 'vip', width: 80,align:'center', sort: true,templet:'#isVipTpl'}
            ,{field: 'phone', title: '手机号', width: 180,align:'center',templet:'<div>{{d.inRoomInfo.phone}}</div>'}
            ,{field: 'createDate', title: '下单时间', width: 220, align:'center',sort: true}
            ,{field: 'orderMoney', title: '总价', width: 120, align:'center',sort: true}
            ,{field: 'remark', title: '备注', width: 250, align:'center',sort: true}
            ,{field: 'orderStatus', title: '状态', width: 120, align:'center',sort: true,templet:'#orderStatusTpl'}
            ,{fixed: 'right',title: '操作', width:120, align:'center', toolbar: '#barDemo'}
        ]],
        done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        }
    });

    //监听订单查询的form表单
    form.on('submit(demo1)', function(data){
        //构建查询的订单条件参数对象
        var queryJsonOrders = {};
        queryJsonOrders['orderNum'] = data.field.orderNum;
        queryJsonOrders['orderStatus'] = data.field.orderStatus;
        /*if(data.field.queryTimes!=''){*/
            var arrTime = data.field.queryTimes.split(" - ");
            queryJsonOrders['beginDate'] = arrTime[0];
            queryJsonOrders['endDate'] = arrTime[1];
        /*}*/
        //执行条件查询
        console.log(queryJsonOrders);
        flush(queryJsonOrders);
        return false;  //阻止表单进行action提交
    });

    //数据表格的工具条监听
    table.on('tool(test)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(layEvent === 'del'){
            layer.confirm('真的删除此订单么', function(index){
                updFlag(obj);
                layer.close(index);
            });
        }else {
            layer.confirm('确定要支付此订单么？', function (index) {
                window.open('orders/toPay?orderNum='+data.orderNum+'&orderMoney='+data.orderMoney);
                layer.close(index);
            });
        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var data = checkStatus.data; //选中行的数据
        //1.判断是否有选中行数据
        if(data.length!=0){
            //2.验证选中的数据中有没有未支付的
            var flag = true;  //判断是否批量删除数据 是
            var ids = '';
            //通过循环找到每一个选中的数据的支付状态，只要有一个未支付，提示不能批量删除，结束循环
            for (var i=0;i<data.length;i++){
                if(data[i].orderStatus=='0'){
                    flag = false;
                    break;
                }else {
                    ids += data[i].id + ",";
                }
            }
            if(flag){
                layer.confirm('真的删除选中的订单么？', function(index){
                    ids = ids.substring(0,ids.length-1);
                    //批量修改订单的显示状态
                    updBatchFlag(ids);
                    layer.close(index);
                });
            }else {
                layer.msg('选中的订单有未支付订单！！', {icon: 2,time:2000,anim: 6,shade:0.5});
            }
        }else {
            layer.msg('请选择要删除的订单！！', {icon: 3,time:2000,anim: 6,shade:0.5});
        }
    });

    //刷新数据表格
    function flush(queryJsonOrders) {
        table.reload('demo', {
            where: queryJsonOrders//异步数据接口的额外参数
            ,page: {
                curr: 1
            }
        });
    }
    //修改订单状态
    function updFlag(obj) {
        $.ajax({
            type:"POST",
            url:"orders/updByPrimaryKeySelective",
            data:{
                "id":obj.data.id,
                "flag":0
            },
            success:function (data) {
                if(data==='success'){
                    layer.msg('订单信息删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del();
                }else {
                    layer.msg('订单信息删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //批量修改订单的显示状态
    function updBatchFlag(ids) {
        $.ajax({
            type:"POST",
            url:"orders/updBatchByPrimaryKeySelective",
            data:{
                "ids":ids,
                "flag":0
            },
            success:function (data) {
                if(data==='success'){
                    layer.msg('订单数据批量删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    flush();
                }else {
                    layer.msg('订单数据批量删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }


});