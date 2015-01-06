/* 菜園図編集処理クラス　 */
var GardenmapEdit = {}; // namespace
var DRAG;

(function($) {
    GardenmapEdit.con = {
      id: {
		cvm: 'cv1',
		cvm2: 'cv2',
		cvdiv: 'cvdiv',
		cvdiv2: 'cvdiv2',
		showScaleSelect: 'showScaleSelect',
		taskParamView: 'taskParamView',
		taskParamViewDiv: 'taskParamViewDiv',
		taskConnectLine: 'taskConnectLine'
      },
      lineType: {
        Next: 'Next',
		CallBack: 'CallBack'
      },
      taskParam: {
        taskParamId: null,
        taskIndex: null
      },
      dtype: {
        Tomato:       'Tomato',
        Strawberry:   'Strawberry',
        Basil:        'Basil',
        TomatoBasil:  'TomatoBasil',
        Marigold:     'Marigold',
        Cabbage:      'Cabbage'
      }
    };

    
    GardenmapEdit.taskAdd = {
      now: false,
      item: null
    };

    GardenmapEdit.taskMove = {
      now: false,
      item: null,
      beforeCoordination:null
    };
    DRAG = {
      now: false,
      item: null
    };
    GardenmapEdit.viewTaskInfo = {
      mouseOverType: "",
      clickTaskId: "",
      item: null
    };

     // $(window).load(function() {
//          
// // testData 
// 
       // var jsonFlowText = $('#form_gardenmap_plant_set_definition_json').val();
       // var jsonObj = JSON.parse(jsonFlowText);
       // GardenmapEdit.canvasComponent(jsonObj);
//  
       // var $cvdiv = $('#' + GardenmapEdit.con.id.cvdiv);
       // $cvdiv.mousedown(GardenmapEdit.cvmsDown);
       // $cvdiv.mouseup(GardenmapEdit.cvmsUp);
       // $cvdiv.mousemove(GardenmapEdit.cvmsMove);
       // $cvdiv.click(GardenmapEdit.cvmsClick);
     // });
// 
    GardenmapEdit.cvmsDown = function(evt) {
        var cx = evt.pageX - DRAG.cvpos.x;
        var cy = evt.pageY - DRAG.cvpos.y;
        var itemIdx = DRAG.checkItem(cx, cy);
        if ( itemIdx !== null){
            GardenmapEdit.taskMove.now = true;
            GardenmapEdit.taskMove.item = itemIdx;
            GardenmapEdit.taskMove.beforeCoordination = DRAG.itemAr[itemIdx].x + '-' + DRAG.itemAr[itemIdx].y;
        }
      return false;
    };
     /**
     * マウスダウンイベント
     *
     * @param {} evt
     */
    GardenmapEdit.cvmsUp = function(evt) {
        var cx = evt.pageX - DRAG.cvpos.x;
        var cy = evt.pageY - DRAG.cvpos.y;
        var itemIdx = DRAG.checkItem(cx, cy);
        var xscroll =document.getElementsByClassName("canvasScroll")[0].scrollLeft;
        var yscroll =document.getElementsByClassName("canvasScroll")[0].scrollTop;

        if (itemIdx !== null){
            var itemPart = DRAG.itemAr[itemIdx].type;
            
            if (itemPart !== 'taskIcon' || GardenmapEdit.taskMove.item !== itemIdx){
                GardenmapEdit.taskMove.now = false;
            }
        }
        return false;
    };
    GardenmapEdit.cvmsMove = function(evt) {
        return false;
    };

    GardenmapEdit.getReturnControlParamHTML = function(itemIdx) {
        var paramDataHTML = "<div id ='taskParamViewDiv' class='paramwaku'>" +
                    "<h4>条件1<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.condition1 + "></h4>" +
                    "<h4>条件2<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.condition2 + "></h4>" +
                    "<h4>条件3<input align='left' type='text' size='48' height='100' value=" +  DRAG.itemAr[itemIdx].param.condition3 + "></h4>" +
                    "<h4>条件4<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.condition4 + "></h4>" +
                    "<h4>条件5<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.condition5 + "></h4>" +
                    "<h4>戻り条件(コメント)<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.returnConditionDetail + "></h4></div><p/>";
        return paramDataHTML;
    };
    GardenmapEdit.getVegetableParamHTML = function(itemIdx) {
        var paramDataHTML = "<div id ='taskParamViewDiv' class='paramwaku'>" +
                    "<h4>野菜名<input align='left' type='text' size='48' height='100' value=" + DRAG.itemAr[itemIdx].param.taskName + "></h4></div><p/>";
        return paramDataHTML;
    };

    GardenmapEdit.cvmsClick = function(evt) {
        var cx = evt.pageX - DRAG.cvpos.x;
        var cy = evt.pageY - DRAG.cvpos.y;
        var removetable;
        var paramDataHTML;
        var itemIdx = DRAG.checkItem(cx, cy);
        var removetable;

        if (itemIdx !== null ){
        // if(GardenmapEdit.taskMove.now) {
            if (moveTaskIcon.style.display === "none" || moveTaskIcon.style.display === ""){
            	// タスク移動中の状態に設定
                // GardenmapEdit.taskLineConnect.now = false;
                GardenmapEdit.taskMove.now = true;
                var updSep = 1;
                var xscroll =document.getElementsByClassName("canvasScroll")[0].scrollLeft;
                var yscroll =document.getElementsByClassName("canvasScroll")[0].scrollTop;
                if (Math.abs(cx - DRAG.itemAr[itemIdx].x * DRAG.grSep + xscroll ) >= updSep ||
                    Math.abs(cy - DRAG.itemAr[itemIdx].y + DRAG.grSep + yscroll ) >= updSep) {
                  moveTaskIcon.style.top = DRAG.itemAr[itemIdx].y * DRAG.grSep - yscroll + DRAG.grSepqua*0.5 + 290 + "px";
                  moveTaskIcon.style.left = DRAG.itemAr[itemIdx].x * DRAG.grSep + DRAG.grSepqua*1.5 + 255 + "px";
                  moveTaskIcon.style.display = "block";
                  
                  moveTaskIcon.style.backgroundImage = "url(/assets/" + DRAG.itemAr[itemIdx].type + "_move.png)";
                }
            } else{
                GardenmapEdit.taskMove.now = false;
                moveTaskIcon.style.display = "none";
            }
        	
        	// 野菜情報を表示
            if (GardenmapEdit.viewTaskInfo.clickTaskId === "" || GardenmapEdit.viewTaskInfo.clickTaskId !== DRAG.itemAr[itemIdx].taskId) {
                if ( GardenmapEdit.viewTaskInfo.mouseOverType !== DRAG.itemAr[itemIdx].type) {
                    removetable = $("#taskParamViewDiv");
                    if(removetable !== null){
                        removetable.remove();
                    }
                    // イチゴ情報のDOMを構築する
                    if(DRAG.itemAr[itemIdx].type === "Strawberry") {
                      paramDataHTML = VegetableInfo.getStrawberryParamHTML();
                    }
                    // else if(DRAG.itemAr[itemIdx].type === "ReturnControl") {
                        // paramDataHTML = GardenmapEdit.getReturnControlParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "Tomato" ||
                              // DRAG.itemAr[itemIdx].type === "Strawberry") {
                        // paramDataHTML = GardenmapEdit.getVegetableParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "SubFlowCall") {
                        // paramDataHTML = GardenmapEdit.getSubFlowCallParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "FileWait") {
                        // paramDataHTML = GardenmapEdit.getFileWaitParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "DatetimeWait") {
                        // paramDataHTML = GardenmapEdit.getDatetimeWaitParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "BranchStart") {
                        // paramDataHTML = GardenmapEdit.getBranchStartParamHTML(itemIdx);
                    // } else if(DRAG.itemAr[itemIdx].type === "ParallelJoin") {
                        // paramDataHTML = GardenmapEdit.getParallelJoinParamHTML();
                    // } else if(DRAG.itemAr[itemIdx].type === "ParallelStart") {
                        // paramDataHTML = GardenmapEdit.getParallelStartParamHTML();
                    // } else if(DRAG.itemAr[itemIdx].type === "BranchJoin") {
                        // paramDataHTML = GardenmapEdit.getBranchJoinParamHTML();
                    // }
                    $("#taskParamView").append( paramDataHTML );
                    GardenmapEdit.viewTaskInfo.mouseOverType = DRAG.itemAr[itemIdx].type;
               }
            }
        }
    };
    GardenmapEdit.countLength = function (str) {
        var r = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
            // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
            if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                r += 1;
            } else {
                r += 2;
            }
        }
        return r;
    } ;
    
    GardenmapEdit.addCSSRule = function (selector, css) {
         var sheets = document.styleSheets,
         sheet = sheets[sheets.length - 1];

        if(sheet.insertRule) {
         sheet.insertRule(selector + '{' +  css + '}', sheet.cssRules.length);
        }else if(sheet.addRule) {
         sheet.addRule(selector, css, -1);
        }
    };



    GardenmapEdit.canvasComponent = function (jsonFlowObj,cultivateVegetableList) {

        var canvas = document.getElementById(GardenmapEdit.con.id.cvm);
        if ( ! canvas || ! canvas.getContext ) { return false; }
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.7;
        ctx.globalCompositeOperation = "source-over";

        canvas = document.getElementById(GardenmapEdit.con.id.cvm);
        canvas.height = 300;
        canvas.width = 675;

        DRAG = new GardenmapCanvasCom.canv(GardenmapEdit.con.id.cvm, ctx, 40, canvas.width, canvas.height, GardenmapEdit, jsonFlowObj,cultivateVegetableList);
        var $cvdiv = $('#' + this.con.id.cvdiv);
        DRAG.cvpos.x = $cvdiv.offset().left;
        DRAG.cvpos.y = $cvdiv.offset().top;

        canvas = document.getElementById(GardenmapEdit.con.id.cvm);
        canvas.height = DRAG.jsonFlowObj.workFlowDesignHeight;
        canvas.width = DRAG.jsonFlowObj.workFlowDesignWidth;

        // DRAG.changeGrSep(parseInt(DRAG.jsonFlowObj.workFlowDesignGride));
        DRAG.blank(canvas.width, canvas.height);
        DRAG.readWorkFlow();
        DRAG.view();

    };

      this.readFlowInfo = function() {
        this.flowInfo = new this.flowInfo(DRAG.jsonFlowObj.flowInstanceId, DRAG.jsonFlowObj.subGyoumuCode, DRAG.jsonFlowObj.subGyoumuName,DRAG.jsonFlowObj.startedMenu,DRAG.jsonFlowObj.flowStartTime,DRAG.jsonFlowObj.flowEndTime,DRAG.jsonFlowObj.startedUserName);
        
      };

    changeCoordinate = function(taskIndex) {
        if (GardenmapEdit.taskMove.beforeCoordination !== DRAG.itemAr[taskIndex].x + "-" + DRAG.itemAr[taskIndex].y){
            for (var i = 0; i < DRAG.jsonFlowObj.taskLayouts.length; i++) {
                if(DRAG.jsonFlowObj.taskLayouts[i].taskId === DRAG.itemAr[taskIndex].taskId) {
                    DRAG.jsonFlowObj.taskLayouts[i].coordinate = DRAG.itemAr[taskIndex].x + "-" + DRAG.itemAr[taskIndex].y;
                }
                for (j = 0; j < DRAG.jsonFlowObj.taskLayouts[i].nextTaskCoordinateDefinition.length; j++) {
                    if(DRAG.jsonFlowObj.taskLayouts[i].nextTaskCoordinateDefinition[j] === GardenmapEdit.taskMove.beforeCoordination){
                       DRAG.jsonFlowObj.taskLayouts[i].nextTaskCoordinateDefinition[j] = DRAG.itemAr[taskIndex].x + "-" + DRAG.itemAr[taskIndex].y;
                    }
                }
                if (GardenmapEdit.taskMove.beforeCoordination === DRAG.jsonFlowObj.taskLayouts[i].coordinate2) {
                    DRAG.jsonFlowObj.taskLayouts[i].coordinate2 = DRAG.itemAr[taskIndex].x + "-" + DRAG.itemAr[taskIndex].y;
                }
            }
        }
    };
    addNextLine = function(taskIndex) {
        DRAG.jsonFlowObj.taskLayouts[GardenmapEdit.taskLineConnect.item].nextTaskCoordinateDefinition.push(DRAG.itemAr[taskIndex].x + "-" + DRAG.itemAr[taskIndex].y);
        return false;
    };

    deleteTask = function(taskIndex) {
		var delTargetTaskId = DRAG.jsonFlowObj.taskData[taskIndex].taskId;
		// レイアウト情報を削除
        for (var i = 0; i < DRAG.jsonFlowObj.taskLayouts.length; i++) {
            if(DRAG.jsonFlowObj.taskLayouts[i].taskId === delTargetTaskId){
                DRAG.jsonFlowObj.taskLayouts.splice(i, 1);
            }
        }
        // ステータス情報を削除
        for (var j = 0; j < DRAG.jsonFlowObj.taskState.length; j++) {
            if(DRAG.jsonFlowObj.taskState[j].taskId === delTargetTaskId){
                DRAG.jsonFlowObj.taskState.splice(j, 1);
            }
        }
		// タスク情報を削除
        DRAG.jsonFlowObj.taskData.splice(taskIndex, 1);
    };
    
    deleteNextLine = function(taskIndex,nextCoordinatex,nextCoordinatey) {
        for (j = 0; j < DRAG.jsonFlowObj.taskLayouts[taskIndex].nextTaskCoordinateDefinition.length; j++) {
            if(DRAG.jsonFlowObj.taskLayouts[taskIndex].nextTaskCoordinateDefinition[j] === nextCoordinatex + "-" + nextCoordinatey){
                DRAG.jsonFlowObj.taskLayouts[taskIndex].nextTaskCoordinateDefinition.splice(j, 1);
                return true;
            }
        }
        return false;
    };
    displayMiddlehigtLine = function(){
        if(GardenmapEdit.clickTaskLineEndConnect.endCoordinationy - GardenmapEdit.clickTaskLineStartConnect.startCoordinationy !== 0){
            if(GardenmapEdit.clickTaskLineEndConnect.endCoordinationy < GardenmapEdit.clickTaskLineStartConnect.startCoordinationy){
                clickTaskConnectMiddleVerticalLine.style.top = GardenmapEdit.clickTaskLineStartConnect.startCoordinationy * DRAG.grSep + DRAG.grSepqua + Math.abs(GardenmapEdit.clickTaskLineEndConnect.endCoordinationy - GardenmapEdit.clickTaskLineStartConnect.startCoordinationy)/2*DRAG.grSep + "px";
                clickTaskConnectMiddleCrossedLine.style.top = GardenmapEdit.clickTaskLineStartConnect.startCoordinationy * DRAG.grSep + DRAG.grSepqua + Math.abs(GardenmapEdit.clickTaskLineEndConnect.endCoordinationy - GardenmapEdit.clickTaskLineStartConnect.startCoordinationy)/2*DRAG.grSep + "px";
            } else{
                clickTaskConnectMiddleVerticalLine.style.top = GardenmapEdit.clickTaskLineEndConnect.endCoordinationy * DRAG.grSep + DRAG.grSepqua + Math.abs(GardenmapEdit.clickTaskLineStartConnect.startCoordinationy - GardenmapEdit.clickTaskLineEndConnect.endCoordinationy)/2*DRAG.grSep + "px";
                clickTaskConnectMiddleCrossedLine.style.top = GardenmapEdit.clickTaskLineEndConnect.endCoordinationy * DRAG.grSep + DRAG.grSepqua + Math.abs(GardenmapEdit.clickTaskLineStartConnect.startCoordinationy - GardenmapEdit.clickTaskLineEndConnect.endCoordinationy)/2*DRAG.grSep + "px";
            }
            clickTaskConnectMiddleVerticalLine.style.left = GardenmapEdit.clickTaskLineStartConnect.startCoordinationx * DRAG.grSep + DRAG.grSep + "px";
            clickTaskConnectMiddleVerticalLine.style.height = Math.abs(GardenmapEdit.clickTaskLineEndConnect.endCoordinationy - GardenmapEdit.clickTaskLineStartConnect.startCoordinationy)*DRAG.grSep + 3 + "px";
            clickTaskConnectMiddleVerticalLine.style.display = "block";
            
            clickTaskConnectMiddleCrossedLine.style.left = GardenmapEdit.clickTaskLineStartConnect.startCoordinationx * DRAG.grSep + DRAG.grSep + "px";
            clickTaskConnectMiddleCrossedLine.style.width = Math.abs(GardenmapEdit.clickTaskLineEndConnect.endCoordinationx - GardenmapEdit.clickTaskLineStartConnect.startCoordinationx - 1)*DRAG.grSep + 3 + "px";
            clickTaskConnectMiddleCrossedLine.style.display = "block";
            
            return true;
        } else {
            if(GardenmapEdit.clickTaskLineEndConnect.endCoordinationx - GardenmapEdit.clickTaskLineStartConnect.startCoordinationx !== 1){
                clickTaskConnectMiddleCrossedLine.style.top = DRAG.grSepqua + GardenmapEdit.clickTaskLineStartConnect.startCoordinationy*DRAG.grSep + + 120 + 1 + "px";
                clickTaskConnectMiddleCrossedLine.style.left = GardenmapEdit.clickTaskLineStartConnect.startCoordinationx * DRAG.grSep + DRAG.grSep + DRAG.grSepqua/2 + "px";
                clickTaskConnectMiddleCrossedLine.style.width = Math.abs(GardenmapEdit.clickTaskLineEndConnect.endCoordinationx - GardenmapEdit.clickTaskLineStartConnect.startCoordinationx - 1)*DRAG.grSep + 3 + "px";
                clickTaskConnectMiddleCrossedLine.style.display = "block";
            }
        }
        return false;
    };

})(jQuery);




























var textValue;
function setTaskParam(value,taskIndex, taskName) {
    if (textValue == value) { return; }
    DRAG.setUIParam(taskIndex, taskName, value);
//    DRAG.itemAr[taskIndex].param.taskName = value;
}
function beforTaskParam(value) {
    textValue = value;
}

/***** ドラッグ開始時の処理 *****/
function f_dragstart1(event){
  //ドラッグするデータのid名をDataTransferオブジェクトにセット
  event.dataTransfer.setData("text", event.target.id);
}

/***** ドラッグ要素がドロップ要素に重なっている間の処理 *****/
function f_dragover1(event){
  //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
  event.preventDefault();
}

/***** ドロップ時の処理 *****/
function f_drop1(event){
  //ドラッグされたデータのid名をDataTransferオブジェクトから取得
  var id_name = event.dataTransfer.getData("text");
  //id名からドラッグされた要素を取得
  var drag_elm =document.getElementById(id_name);
  //ドロップ先にドラッグされた要素を追加
    var img = new Image();
    img.src = "/assets/UI_on.png";
    event.currentTarget.appendChild(img);

  //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
  event.preventDefault();
}

/***** ドロップ時の処理 *****/
function f_drop(event){
  //ドラッグされたデータのid名をDataTransferオブジェクトから取得
  var id_name = event.dataTransfer.getData("text");
  //id名からドラッグされた要素を取得
  var drag_elm =document.getElementById(id_name);
  //ドロップ先にドラッグされた要素を追加
    var img = new Image();
    img.src = "css/UI_on.png";
    event.currentTarget.appendChild(img);

  //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
  event.preventDefault();
}
cancelFullScreen =function(event) {
    
    if (event.keyCode === 27 ){ // Escape key
        GardenmapEdit.taskMove.now = false;
        // this.taskLineConnect.now = false;
        // this.clickTaskLineEndConnect.now = false;
        // this.clickTaskLineStartConnect.now = false;
        moveTaskIcon.style.display = "none";
        // clickTaskConnectStartLine.style.display = "none";
        // clickTaskConnectEndLine.style.display = "none";
        // clickTaskConnectMiddleVerticalLine.style.display = "none";
        // clickTaskConnectMiddleCrossedLine.style.display = "none";
        // var divLine = $("#" + this.con.id.taskConnectLine);
        // if(divLine !== null){
           // divLine.remove();
        // }
        // this.taskLineConnect.now = false;

    } else if(event.keyCode === 46){// Delete key
        if( GardenmapEdit.taskMove.now){
            GardenmapEdit.taskMove.now = false;
            // this.taskLineConnect.now = false;
            moveTaskIcon.style.display = "none";
            deleteTask(GardenmapEdit.taskMove.item);
        }
        canvas = document.getElementById(GardenmapEdit.con.id.cvm);
        if ( ! canvas || ! canvas.getContext ) { return false; }
        ctx = canvas.getContext("2d");
        DRAG.blank(canvas.width, canvas.height);
        DRAG.readWorkFlow();
        DRAG.view(true);
    }
    return false;
};

window.addEventListener('keypress', cancelFullScreen, true);
window.addEventListener('keydown', cancelFullScreen, true);

/**
* マウスクリックイベント（Canvas以外の野菜アイコンをクリックした場合、野菜情報を表示する
*
* @param {} evt
*/
window.addEventListener("click", function(event) {
  var type = event.target.id;
  var paramDataHTML = null;

  if ( GardenmapEdit.viewTaskInfo.mouseOverType != type) {
      // 野菜情報を表示

      // イチゴ情報のDOMを構築する
      if(type === "Strawberry") {
        // paramDataHTML = GardenmapEdit.getStrawberryParamHTML();
        paramDataHTML = VegetableInfo.getStrawberryParamHTML();
      } else {
     	GardenmapEdit.viewTaskInfo.mouseOverType = "";
      }
      if (paramDataHTML != null) {
		  removetable = $("#taskParamViewDiv");
		  if(removetable !== null){
		      removetable.remove();
		  }
	      $("#taskParamView").append( paramDataHTML );
	      GardenmapEdit.viewTaskInfo.mouseOverType = type;
      }
  } else {
  	GardenmapEdit.viewTaskInfo.mouseOverType = "";
  }
}, false);

window.addEventListener("dragover", function(event) {
  event.preventDefault();  // ブラウザのデフォルトの画像表示処理をOFF
}, false);

window.addEventListener("dragstart", function(event) {
  event.dataTransfer.setData("taskType", event.target.id);
  GardenmapEdit.taskAdd.now = true;
}, false);

window.addEventListener("drop", function(event) {
  // if(GardenmapEdit.taskMove.now === true){
     // var cx = event.pageX - DRAG.cvpos.x;
     // var cy = event.pageY - DRAG.cvpos.y;
// 
     // DRAG.itemAr[GardenmapEdit.taskMove.item].x = DRAG.getXCoordinate(cx);
     // DRAG.itemAr[GardenmapEdit.taskMove.item].y = DRAG.getYCoordinate(cy);
     // GardenmapEdit.taskMove.now = false;
     // moveTaskIcon.style.display = "none";
     // changeCoordinate(GardenmapEdit.taskMove.item);
     // // 位置JSONの変更
     // ff = JSON.stringify(DRAG.jsonFlowObj);
     // $('#form_gardenmap_plant_set_definition_json').val(JSON.stringify(DRAG.jsonFlowObj));
  // }
  canvas = document.getElementById(GardenmapEdit.con.id.cvm);
  if ( ! canvas || ! canvas.getContext ) { return false; }
  ctx = canvas.getContext("2d");
  DRAG.blank(canvas.width, canvas.height);
  DRAG.view(true);
}, false);

/**
* 野菜アイコンからキャンバスへドロップ時のイベント
*
* @param {integer} coordinate 取得したい元の座標
*/
window.addEventListener("drop", function(event) {
  var cx = event.pageX - DRAG.cvpos.x;
  var cy = event.pageY - DRAG.cvpos.y;
  var rtnXCoordinate =  DRAG.getXCoordinate(cx);
  var rtnYCoordinate =  DRAG.getXCoordinate(cy);

  var dragTaskType = event.dataTransfer.getData("taskType");
  var itemIdx = DRAG.checkItem(cx, cy);

  if( itemIdx === null ) {
	if(GardenmapEdit.taskMove.now === true){
		// 野菜の位置情報を変更
	     var cx = event.pageX - DRAG.cvpos.x;
	     var cy = event.pageY - DRAG.cvpos.y;
	
	     DRAG.itemAr[GardenmapEdit.taskMove.item].x = DRAG.getXCoordinate(cx);
	     DRAG.itemAr[GardenmapEdit.taskMove.item].y = DRAG.getYCoordinate(cy);
	     GardenmapEdit.taskMove.now = false;
	     moveTaskIcon.style.display = "none";
	     changeCoordinate(GardenmapEdit.taskMove.item);
	     // 位置JSONの変更
	     ff = JSON.stringify(DRAG.jsonFlowObj);
	     // $('#form_gardenmap_plant_set_definition_json').val(JSON.stringify(DRAG.jsonFlowObj));
    }
  	else if(dragTaskType.indexOf("CompanionPlant") < 0){
        // 野菜を菜園図に追加
	    newTaskId = Date.now() + rtnXCoordinate + "-" + dragTaskType + "-" + "new";
	    addTaskData = JSON.parse('{"taskId":"' + newTaskId + '","taskType":"' + dragTaskType + '","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"}');
	    DRAG.jsonFlowObj.taskData.push(addTaskData);
	    addTaskLayouts = JSON.parse('{"taskId":"' + newTaskId + '","coordinate":"' + rtnXCoordinate + "-" + rtnYCoordinate + '","coordinate2":"","nextTaskCoordinateDefinition":[]}');
	    DRAG.jsonFlowObj.taskLayouts.push(addTaskLayouts);
	    addTaskStateLayouts = JSON.parse('{"taskId":"' + newTaskId + '"}');
	    DRAG.jsonFlowObj.taskState.push(addTaskStateLayouts);
	
	    addVagetableCode = dragTaskType.toLowerCase();
	    if (!(addVagetableCode in DRAG.cultivateVegetableList)){
      	  DRAG.cultivateVegetableList[ addVagetableCode ] = DRAG.getVegetableName(dragTaskType);	
	    }
	 } else {
	 	// コンパニオン菜園図の追加
	 	// トマトとバジル
	 	var jsonFlowText　= '{"workFlowDesignGride":"80","workFlowDesignHeight":"500","workFlowDesignWidth":"500","taskData":[{"taskId":"1418128597920-Tomato-new","taskType":"Tomato","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128604784-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128606861-Tomato-new","taskType":"Tomato","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128609051-Tomato-new","taskType":"Tomato","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128611103-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128616173-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128618242-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128621979-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128625551-Basil-new","taskType":"Basil","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"},{"taskId":"1418128628095-moveTaskIcon-new","taskType":"moveTaskIcon","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"}],"taskLayouts":[{"taskId":"1418128597920-Tomato-new","coordinate":"4-2","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128604784-Basil-new","coordinate":"4-0","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128606861-Tomato-new","coordinate":"1-2","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128609051-Tomato-new","coordinate":"7-2","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128611103-Basil-new","coordinate":"4-4","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128616173-Basil-new","coordinate":"2-0","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128618242-Basil-new","coordinate":"2-4","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128621979-Basil-new","coordinate":"7-0","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128625551-Basil-new","coordinate":"7-4","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1418128628095-moveTaskIcon-new","coordinate":"2-0","coordinate2":"","nextTaskCoordinateDefinition":[]}],"taskState":[{"taskId":"1418128597920-Tomato-new"},{"taskId":"1418128604784-Basil-new"},{"taskId":"1418128606861-Tomato-new"},{"taskId":"1418128609051-Tomato-new"},{"taskId":"1418128611103-Basil-new"},{"taskId":"1418128616173-Basil-new"},{"taskId":"1418128618242-Basil-new"},{"taskId":"1418128621979-Basil-new"},{"taskId":"1418128625551-Basil-new"},{"taskId":"1418128628095-moveTaskIcon-new"}]}';
	 	var jsonObj = JSON.parse(jsonFlowText); 
	 	DRAG.jsonFlowObj = jsonObj 

	    switch (dragTaskType){
	      // トマトとバジル
	      case "CompanionPlant_01":
		    if (!('tomato' in DRAG.cultivateVegetableList)){
	      	  DRAG.cultivateVegetableList[ 'tomato' ] = DRAG.getVegetableName('Tomato');	
		    }
		    if (!('basil' in DRAG.cultivateVegetableList)){
		      DRAG.cultivateVegetableList[ 'basil' ] = DRAG.getVegetableName('Basil');
		    }
		    break;
		}
	 }
     canvas = document.getElementById(GardenmapEdit.con.id.cvm);
     if ( ! canvas || ! canvas.getContext ) { return false; }
     ctx = canvas.getContext("2d");
     DRAG.blank(canvas.width, canvas.height);
     DRAG.readWorkFlow();
     DRAG.view(true);
     GardenmapEdit.taskAdd.now = false;
     var strVegetable_list ="";
     for (var key in DRAG.cultivateVegetableList) {
  	   if(strVegetable_list === ""){
	     strVegetable_list = '[' + key + '=' + DRAG.cultivateVegetableList[key];
	   }
  	   else{
	     strVegetable_list = strVegetable_list + ',' + key + '=' + DRAG.cultivateVegetableList[key];	
	   }
     }
     strVegetable_list = strVegetable_list + "]";
     $('#form_gardenmap_plant_set_definition_json').val(JSON.stringify(DRAG.jsonFlowObj));
     $('#form_gardenmap_cultivate_vegetable_list').val(strVegetable_list);
     // DRAG.ajaxPlantSetDefinition(JSON.stringify(DRAG.jsonFlowObj));
        
  }
  event.preventDefault();
});

