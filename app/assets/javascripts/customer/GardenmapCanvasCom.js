/* 菜園図Canvas共通クラス */
var GardenmapCanvasCom = {}; // namespace
(function($){
    GardenmapCanvasCom.item = function(taskId, type, param) {
      this.taskId = taskId;
      this.x = "";
      this.y = "";
      this.sx = "";
      this.sy = "";
      this.next = "";
      this.type = type;
      this.param = param;
      this.circleColor = "";
      this.stateIcon = "";
    };
    GardenmapCanvasCom.UI = function(taskName,divId,initStatus,isTrayTask,trayTaskGroupId,taskAuth) {
     this.taskName = taskName;
     this.divId = divId;
     this.initStatus = initStatus;
     this.isTrayTask = isTrayTask;
     this.trayTaskGroupId = trayTaskGroupId;
     this.taskAuth = taskAuth;
    };
    GardenmapCanvasCom.Vegetable = function(taskName) {
     this.taskName = taskName;
    };
    GardenmapCanvasCom.SubFlowCall = function(flowId) {
        this.flowId = flowId;
    };
    GardenmapCanvasCom.ReturnControl = function(condition1,condition2,condition3,condition4,condition5,returnConditionDetail) {
        this.condition1 = condition1;
        this.condition2 = condition2;
        this.condition3 = condition3;
        this.condition4 = condition4;
        this.condition5 = condition5;
        this.returnConditionDetail = returnConditionDetail;
    };
    GardenmapCanvasCom.DatetimeWait = function(startDate,canChange) {
        this.startDate = startDate;
        this.canChange = canChange;
    };
    GardenmapCanvasCom.FileWait = function(targetFolder,targetFile) {
        this.targetFolder = targetFolder;
        this.targetFile = targetFile;
    };
    GardenmapCanvasCom.ParallelStart = function() {
    };
    GardenmapCanvasCom.ParallelJoin = function() {
    };
    GardenmapCanvasCom.BranchJoin = function() {
    };
    GardenmapCanvasCom.FlowStart = function() {
    };
    GardenmapCanvasCom.FlowEnd = function() {
    };
    GardenmapCanvasCom.ParallelStart = function() {
    };
    
    // カンバスの初期化メソッド
    GardenmapCanvasCom.canv = function(canvasId, ctx, grSep, w, h, names, jsonFlowObj,cultivateVegetableList) {
      this.canvasId = canvasId;
      this.ctx = ctx;
      this.area = {w:w, h:h};
      this.cvpos = {x:0, y:0};
      // grid wide
      this.grSep = grSep;
      this.grSephf = this.grSep / 2;
      this.grSepqua = this.grSep / 4;
      this.grSepx0 = 10;
      this.grSepy0 = 10;
      this.grWidth = 1;
      this.grXAr = [];
      this.grRcv = false;
      this.grYAr = [];
      this.grBcv = false;
      this.itemAr = [];
      this.jsonFlowObj = jsonFlowObj;

	  //Imageオブジェクトを生成して、画像ファイルを先読みしておく
      this.imgTomato = new Image();
      this.imgTomato.src = "/assets/Tomato_off.png";
      this.imgStrawberry = new Image();
      this.imgStrawberry.src = "/assets/Strawberry_off.png";
      this.imgBasil = new Image();
      this.imgBasil.src = "/assets/Basil_off.png";
      this.imgMarigold = new Image();
      this.imgMarigold.src = "/assets/Marigold_off.png";
      this.imgCabbage = new Image();
      this.imgCabbage.src = "/assets/Cabbage_off.png";

      this.cultivateVegetableList = cultivateVegetableList;

      var gcntx = 0;
      if (this.area.w % this.grSep) {
        gcntx = Math.floor(this.area.w / this.grSep);
      } else {
        gcntx = this.area.w / this.grSep - 1;
        this.grRcv = true;
      }
      for (var i = 0; i < gcntx; i++) {
        this.grXAr[i] = this.grSep * (i + 1);
      }

      var gcnty = 0;
      if (this.area.h % this.grSep) {
        gcnty = Math.floor(this.area.h / this.grSep);
      } else {
        gcnty = this.area.h / this.grSep - 1;
        this.grBcv = true;
      }
      for (var i = 0; i < gcnty; i++) {
        this.grYAr[i] = this.grSep * (i + 1);
      }

      this.readWorkFlow = function() {
        this.itemAr = [];
        
        for (var dataIndex = 0; dataIndex < this.jsonFlowObj.taskData.length; dataIndex++) {
            var taskType = this.jsonFlowObj.taskData[dataIndex].taskType;
            var param = this.getTaskParam(dataIndex, taskType);
            this.addViewTask(dataIndex,
                    this.jsonFlowObj.taskData[dataIndex].taskId,
                    taskType,
                    param);
            for (var layoutIndex = 0; layoutIndex < this.jsonFlowObj.taskLayouts.length; layoutIndex++) {
                if(this.jsonFlowObj.taskData[dataIndex].taskId === this.jsonFlowObj.taskLayouts[layoutIndex].taskId) {
                    this.setViewTaskCoordinate(dataIndex,
                            this.getXCoordinateTask(this.jsonFlowObj.taskLayouts[layoutIndex].coordinate),
                            this.getYCoordinateTask(this.jsonFlowObj.taskLayouts[layoutIndex].coordinate),
                            this.getSecondXCoordinateTask(this.jsonFlowObj.taskLayouts[layoutIndex].coordinate2),
                            this.getSecondYCoordinateTask(this.jsonFlowObj.taskLayouts[layoutIndex].coordinate2),
                            this.jsonFlowObj.taskLayouts[layoutIndex].nextTaskCoordinateDefinition);
                    break;
                }
            }
            for (var stateIndex = 0; stateIndex < this.jsonFlowObj.taskState.length; stateIndex++) {
                if(this.jsonFlowObj.taskData[dataIndex].taskId === this.jsonFlowObj.taskState[stateIndex].taskId) {
                    this.setViewTaskstateIcon(dataIndex,
                            this.jsonFlowObj.taskState[stateIndex].taskState);
                    this.setViewTaskCircleColor(dataIndex,
                            this.jsonFlowObj.taskState[stateIndex].taskState);
                    break;
                }
            }
        }
     };
     this.getTaskParam = function(dataIndex, taskType) {
        var param = null;
        if (taskType === names.con.dtype.UI){
            param = new GardenmapCanvasCom.UI(
                    this.jsonFlowObj.taskData[dataIndex].taskName,
                    this.jsonFlowObj.taskData[dataIndex].divId,
                    this.jsonFlowObj.taskData[dataIndex].initStatus,
                    this.jsonFlowObj.taskData[dataIndex].isTrayTask,
                    this.jsonFlowObj.taskData[dataIndex].trayTaskGroupId,
                    this.jsonFlowObj.taskData[dataIndex].taskAuth);
         } else if (taskType === names.con.dtype.Tomato ||
         	        taskType === names.con.dtype.Strawberry ||
         	        taskType === names.con.dtype.Basil ||
         	        taskType === names.con.dtype.TomatoBasil ||
         	        taskType === names.con.dtype.Marigold ||
         	        taskType === names.con.dtype.Cabbage ){
            param = new GardenmapCanvasCom.Vegetable(
                    this.jsonFlowObj.taskData[dataIndex].taskName);
         } else if (taskType === names.con.dtype.ReturnControl){
            param = new GardenmapCanvasCom.ReturnControl(
                    this.jsonFlowObj.taskData[dataIndex].condition1,
                    this.jsonFlowObj.taskData[dataIndex].condition2,
                    this.jsonFlowObj.taskData[dataIndex].condition3,
                    this.jsonFlowObj.taskData[dataIndex].condition4,
                    this.jsonFlowObj.taskData[dataIndex].condition5,
                    this.jsonFlowObj.taskData[dataIndex].returnConditionDetail);
         } else if (taskType === names.con.dtype.SubFlowCall){
            param = new GardenmapCanvasCom.SubFlowCall(
                    this.jsonFlowObj.taskData[dataIndex].flowId);
         } else if (taskType === names.con.dtype.FileWait){
            param = new GardenmapCanvasCom.FileWait(
                    this.jsonFlowObj.taskData[dataIndex].targetFolder,
                    this.jsonFlowObj.taskData[dataIndex].targetFile);
         } else if (taskType === names.con.dtype.DatetimeWait){
            param = new GardenmapCanvasCom.DatetimeWait(
                    this.jsonFlowObj.taskData[dataIndex].startDate,
                    this.jsonFlowObj.taskData[dataIndex].canChange);
         } else if (taskType === names.con.dtype.ParallelJoin){
            param = new GardenmapCanvasCom.ParallelJoin();
         } else if (taskType === names.con.dtype.ParallelStart){
            param = new GardenmapCanvasCom.ParallelStart();
         } else if (taskType === names.con.dtype.BranchJoin){
            param = new GardenmapCanvasCom.BranchJoin();
         } else if (taskType === names.con.dtype.BranchStart){
            param = new GardenmapCanvasCom.BranchStart(
                    this.jsonFlowObj.taskData[dataIndex].branchStartType,
                    this.jsonFlowObj.taskData[dataIndex].branchStartDetail);
         }
         return param;
     };
     /**
     * 配置定義(json)をサーバーにAjax通信し確保させる
     *
     * @param {string} jsonData 送信する配置定義JSON定義文字列
     */
     this.ajaxPlantSetDefinition = function(jsonData){
	   $.ajax({
	     url: 'sort',
	     type:'post',
	     dataType: 'json',
	     data : {'plant_set_definition_json':jsonData},
	     timeout:10000,
	     success: function(data) {
	     },
	     error: function(XMLHttpRequest, textStatus, errorThrown) {
	       alert("error");
	     }
	   });
	 };
     /**
     * グリッドの位置X座標を取得する
     *
     * @param {integer} coordinate 取得したい元の座標
     */
     this.getXCoordinate = function(coordinate){
       var xscroll =document.getElementsByClassName("canvasScroll")[0].scrollLeft;
       var rtnXCoordinate = Math.floor((coordinate + xscroll)/this.grSep);
        
       return rtnXCoordinate; 
     };

     /**
     * グリッドの位置Y座標を取得する
     *
     * @param {integer} coordinate 取得したい元の座標
     */
     this.getYCoordinate = function(coordinate){
       var yscroll =document.getElementsByClassName("canvasScroll")[0].scrollTop;
       var rtnYCoordinate = Math.floor((coordinate + yscroll)/this.grSep);
        
       return rtnYCoordinate; 
    };

    this.getXCoordinateTask = function(coordinate){
         var data = coordinate.split("-");
         return data[0];
    };
     this.getYCoordinateTask = function(coordinate){
         var data = coordinate.split("-");
         return data[1];
     };
     this.getSecondXCoordinateTask = function(coordinate){
         var data = coordinate.split("-");
         if (data === null){
             return "";
        }
        return data[0];
     };
     this.getSecondYCoordinateTask = function(coordinate){
         var data = coordinate.split("-");
         if (data === null){
             return null;
        }
        return data[1];
     };


     this.addViewTask = function(index, taskId, taskKind, ptaskparam) {
        this.itemAr[index] = new GardenmapCanvasCom.item(taskId, taskKind, ptaskparam);
     };
     this.setViewTaskCoordinate = function(index, x, y, sx, sy, next) {
            this.itemAr[index].x = x;
            this.itemAr[index].y = y;
            this.itemAr[index].sx = sx;
            this.itemAr[index].sy = sy;
            this.itemAr[index].next = next;
     };
     this.setViewTaskCircleColor = function(index, circleColor) {
        if (circleColor !== null && circleColor !== ""){
            if ( circleColor === "WAIT"){
                taskStatus = 'gray';
            } else if ( circleColor === "RUN"){
                taskStatus = "green";
            } else if ( circleColor === "PAUSE"){
                taskStatus = "red";
            } else if ( circleColor === "COMPLETE"){
                taskStatus = 'blue';
            } else if ( circleColor === "CANCEL"){
                taskStatus = 'yellow';
            } else if ( circleColor === "SLEEP"){
                taskStatus = '';
            } else {
                taskStatus = 'orange';
            }
        } else {
            taskStatus = "";
        }
        this.itemAr[index].circleColor = taskStatus;
     };
      
     this.getVegetableName = function(taskType) {
       switch (taskType){
		  case 'Tomato':
		    return "トマト";
		  case 'Strawberry':
		    return "イチゴ";
		  case 'Basil':
		    return "バジル";
		  case 'TomatoBasil':
		    return "トマト（コンパニオンプランツ：バジル）";
		  case 'Marigold':
		    return "マリーゴールド";
		  case 'Cabbage':
		    return "キャベツ";
		 }      	
     };

     this.getVegetableId = function(taskType) {
       switch (taskType){
		  case 'Tomato':
		    return 3;
		  case 'Strawberry':
		    return 5;
		  case 'Basil':
		    return 6;
		  case 'TomatoBasil':
		    return 9;
		  case 'Marigold':
		    return 7;
		  case 'Cabbage':
		    return 8;
		 }      	
     };
     this.setViewTaskstateIcon = function(index, state) {
        if ((this.itemAr[index].type === names.con.dtype.UI ||
             this.itemAr[index].type === names.con.dtype.Tomato ||
             this.itemAr[index].type === names.con.dtype.Strawberry ||
             this.itemAr[index].type === names.con.dtype.Basil ||
             this.itemAr[index].type === names.con.dtype.TomatoBasil ||
             this.itemAr[index].type === names.con.dtype.Marigold ||
             this.itemAr[index].type === names.con.dtype.Cabbage ||
             this.itemAr[index].type === names.con.dtype.FileWait ||
             this.itemAr[index].type === names.con.dtype.SubFlowCall)){
             if ((typeof state === "undefined" || state === "SLEEP" || state === "WAIT" || state === "PAUSE" || state === "CANCEL")){
                taskStateIcon = '_off';
             } else if ((state === "RUN"|| state === "COMPLETE")){
                taskStateIcon = '_on';
             }
        } else {
            taskStateIcon = "";
        }
        this.itemAr[index].stateIcon = this.itemAr[index].type + taskStateIcon  + ".png";
      };
     this.changeGrSep = function(setgrsep){
        this.grSep = setgrsep;
        this.grSephf = this.grSep / 2;
        this.grSepqua = this.grSep / 4;
     };

     this.blank = function(w,h) {
	    // 画面をクリア
        this.ctx.clearRect(0, 0, w, h);
        // グリッド表示
        this.ctx.save();
        // this.ctx.globalAlpha = 0.5;透過性
        this.ctx.strokeStyle = "#662100";
        this.ctx.lineWidth = this.grWidth;
        this.ctx.strokeRect(0,0,this.grXAr.length*(this.grSep + 2),this.grYAr.length*(this.grSep + 2));
	    for (var i = 0; i < this.grXAr.length; i++) {
	      this.ctx.beginPath();
	      this.ctx.moveTo(this.grXAr[i], 0);
	      this.ctx.lineTo(this.grXAr[i], this.area.h);
	      this.ctx.stroke();
	    }
	    for (var i = 0; i < this.grYAr.length; i++) {
	      this.ctx.beginPath();
	      this.ctx.moveTo(0,this.grYAr[i]);
	      this.ctx.lineTo(this.area.w, this.grYAr[i]);
	      this.ctx.stroke();
	    }

        this.ctx.restore();
    };

     this.view = function() {
        for (var i = 0; i < this.itemAr.length; i++) {
          this.viewImage(i);
        }
        // for (var i = 0; i < this.itemAr.length; i++) {
          // this.viewCircleColor(i);
        // }
     };

    this.viewImage = function(index) {
        var x = this.itemAr[index].x;
        var y = this.itemAr[index].y;
        var type = this.itemAr[index].type;
        // ctx.save();
        var img = new Image();
        var width = this.grSephf *1.5;
        var height = this.grSephf *1.5;
        img.src = this.getImgSrc(this.itemAr[index].type);
        var canvasId = this.canvasId;
        var xxc = this.grSep * x + this.grSepqua/2;
        var yyc = this.grSep * y + this.grSepqua/2;
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext("2d");
        // ctx.save();
        ctx.beginPath();
        ctx.drawImage(img,xxc, yyc,width,height);
        ctx.closePath();
        ctx.stroke();
        // img.onload = function() {
            // var canvas = document.getElementById(canvasId);
            // var ctx = canvas.getContext("2d");
            // // ctx.save();
            // ctx.beginPath();
            // ctx.drawImage(img,xxc, yyc,width,height);
            // ctx.closePath();
            // ctx.stroke();
        // };
      };

    this.getImgSrc = function(type) {
    	
        if (type === names.con.dtype.Tomato ){
        	return this.imgTomato.src;
        } else if (type === names.con.dtype.Strawberry ){
        	return this.imgStrawberry.src;
        } else if (type === names.con.dtype.Basil ){
        	return this.imgBasil.src;
        } else if (type === names.con.dtype.Marigold ){
        	return this.imgMarigold.src;
        } else if (type === names.con.dtype.Strawberry ){
        	return this.imgStrawberry.src;
        } else if (type === names.con.dtype.Cabbage ){
        	return this.imgCabbage.src;
        }



         // else if (this.itemAr[index].type === names.con.dtype.UI ||
             // this.itemAr[index].type === names.con.dtype.Tomato ||
             // this.itemAr[index].type === names.con.dtype.Basil ||
             // this.itemAr[index].type === names.con.dtype.TomatoBasil ||
             // this.itemAr[index].type === names.con.dtype.Marigold ||
             // this.itemAr[index].type === names.con.dtype.Cabbage){
             // if ((typeof state === "undefined" || state === "SLEEP" || state === "WAIT" || state === "PAUSE" || state === "CANCEL")){
                // taskStateIcon = '_off';
             // } else if ((state === "RUN"|| state === "COMPLETE")){
                // taskStateIcon = '_on';
             // }
        // } else {
            // taskStateIcon = "";
        // }
    };

      // this.viewCircleColor = function(index) {
        // var x = this.itemAr[index].x;
        // var y = this.itemAr[index].y;
        // ctx.save();
        // if (this.itemAr[index].circleColor !== "") {
            // ctx.globalAlpha = 0.4;
            // ctx.beginPath();
            // ctx.arc(this.grSep * x + this.grSepqua * 2, this.grSep * y + this.grSepqua * 2, this.grSepqua*1.5, 0, 2 * Math.PI, false);
            // ctx.strokeStyle = this.itemAr[index].circleColor;
            // ctx.lineWidth = 4 * this.grSep/80;
            // ctx.closePath();
            // ctx.stroke();
            // ctx.globalAlpha = 1;
            // ctx.strokeStyle = 'black';
            // ctx.lineWidth = 1;
        // }
      // };

      this.getNextTaskType = function(nxc,nyc){
            for (var i = 0; i < this.itemAr.length; i++) {
                var x = this.itemAr[i].x;
                var y = this.itemAr[i].y;
                if (x === nxc && y === nyc){
                    return this.itemAr[i].type;
                }
            }
            return "";
      };

      this.drawUI = function(x,y,image) {
        this.ctx.save();
        var img = new Image();
        img.src = image;
        img.onload = function() {
            var canvas = document.getElementById(this.canvasId);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,x, y);
        };
      };

      this.checkItem = function(xxctarget, yyctarget) {
        var rtn = null;
        var xscroll =document.getElementsByClassName("canvasScroll")[0].scrollLeft;
        var yscroll =document.getElementsByClassName("canvasScroll")[0].scrollTop;
        for (var i = 0; i < this.itemAr.length; i++) {
          if (xxctarget + xscroll >= this.grSep * this.itemAr[i].x + 10 &&
              xxctarget + xscroll <= this.grSep * this.itemAr[i].x + this.grSep + 10) {
            if (yyctarget + yscroll >= this.grSep * this.itemAr[i].y + 10 &&
                yyctarget + yscroll <= this.grSep * this.itemAr[i].y + this.grSep  + 10) {
              rtn = i;
              break;
            }
          }
        }
        return rtn;
      };
      this.setCenter = function(index, x, y) {
        var gidx = Math.floor(x / this.grSep);
        if (gidx < 0 ) {
          gidx = 0;
        } else if (gidx >= this.grXAr.length && !this.grRcv) {
          gidx = this.grXAr.length - 1;
        }
        if (gidx < this.grXAr.length) {
          this.itemAr[index].x = this.grXAr[gidx] - this.grSephf;
        } else {
          this.itemAr[index].x = this.grXAr[this.grXAr.length - 1] + this.grSephf;
        }

        gidx = Math.floor(y / this.grSep);
        if (gidx < 0 ) {
          gidx = 0;
        } else if (gidx >= this.grYAr.length && !this.grBcv) {
          gidx = this.grYAr.length - 1;
        }
        if (gidx < this.grYAr.length) {
          this.itemAr[index].y = this.grYAr[gidx] - this.grSephf;
        } else {
          this.itemAr[index].y = this.grYAr[this.grYAr.length - 1] + this.grSephf;
        }
      };
    };
})(jQuery);

