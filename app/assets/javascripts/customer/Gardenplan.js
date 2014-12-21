     /**
     * 配置定義(json)をサーバーにAjax通信し確保させる
     *
     * @param {string} jsonData 送信する配置定義JSON定義文字列
     */
     this.getPlantEventByAjax = function(plantId,vegetableCode){
	   $.ajax({
	     url: 'gardenplans/index',
	     type:'get',
	     dataType: 'json',
	     data : '{gardenplan_id=' + plantId + ',vegetable_code=' + vegetableCode + '}',
	     timeout:10000,
	     success: function(data) {
	     },
	     error: function(XMLHttpRequest, textStatus, errorThrown) {
	       alert("error");
	     }
	   });
	 };