$(function(){
        var url = "http://api.douban.com/v2/movie/top250";
        $.ajax({
            url:url,
            type:"get",
            dataType:"jsonp",
            data:{
                //从第几条开始请求；
                "start":0,
                //请求多少条数据
                "count" : 5
            },
            success:function(data){
                //total总条数属性，计算总页数；
                var total = parseInt(data.total/5);
                result  = data.subjects;
                console.log(result);    
                var str='';
                for(var i=0;i<result.length;i++){
                    var item = result[i];
                    str += '<li><img src="'+item.images.large
                            +'" alt=""><p>'+item.title+'</p></li>'
                }
                //追加渲染到页面
                $('.movieList').append(str);
                //分页插件
                $("#pagination").options({
                        totalPage: total,
                        showPageNum: 5,
                        isShowFL: true,
                        isShowPageSizeOpt: false,
                        isShowSkip: true,
                        isShowRefresh: false,
                        isShowTotalPage: true,
                        isResetPage: false,
                        //currPage：当前页
                        currPage:0,
                        callBack: function (currPage) {
                            $(".movieList").empty();
                            var start = 5*currPage-5;
                            $.ajax({
                                url:url,
                                type:"get",
                                dataType:"jsonp",
                                data:{
                                    //从第几条开始请求；
                                    "start":start,
                                    //请求多少条数据
                                    "count" : 5
                                },
                                success:function(data){
                                    //total总条数属性，计算总页数；
                                    var total = parseInt(data.total/5);
                                    result  = data.subjects;
                                    console.log(result);    
                                    var str='';
                                    for(var i=0;i<result.length;i++){
                                        var item = result[i];
                                        str += '<li><img src="'+item.images.large
                                                +'" alt=""><p>'+item.title+'</p></li>'
                                    }
                                    //追加渲染到页面
                                    $('.movieList').append(str);
                                },
                                error:function(){
                                    console.log("请求失败")
                                }
                            })
                        }
                    });
            },
            error:function(){
                console.log("请求失败")
            }
        })
    })
