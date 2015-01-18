/* 菜園図編集処理クラス　 */
var GardenmapList = {}; // namespace
var DRAG;

(function($) {
    GardenmapList.con = {
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
        UI:           'UI',
        Tomato:       'Tomato',
        Strawberry:   'Strawberry',
        Basil:        'Basil',
        TomatoBasil:  'TomatoBasil',
        Marigold:     'Marigold',
        Cabbage:      'Cabbage',
        Spinach:      'Spinach',
        GarlandChrysanthemun:       'GarlandChrysanthemun',
        Brick:        'Brick',
        WoodChip:     'WoodChip',
        Straw:        'Straw',
        BedOfBrick:   'BedOfBrick',
        Soil:         'Soil',
        Picket:       'Picket',
        Rabbit:       'Rabbit'
      }
    };

    
    GardenmapList.taskAdd = {
      now: false,
      item: null
    };

    GardenmapList.taskMove = {
      now: false,
      item: null,
      beforeCoordination:null
    };
    DRAG = {
      now: false,
      item: null
    };
    GardenmapList.viewTaskInfo = {
      mouseOverTaskId: "",
      clickTaskId: "",
      item: null
    };

    GardenmapList.addCSSRule = function (selector, css) {
         var sheets = document.styleSheets,
         sheet = sheets[sheets.length - 1];

        if(sheet.insertRule) {
         sheet.insertRule(selector + '{' +  css + '}', sheet.cssRules.length);
        }else if(sheet.addRule) {
         sheet.addRule(selector, css, -1);
        }
    };



    GardenmapList.canvasComponent = function (jsonFlowObj, canvasId) {

        var canvas = document.getElementById(canvasId);
        if ( ! canvas || ! canvas.getContext ) { return false; }
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.7;
        ctx.globalCompositeOperation = "source-over";

        canvas = document.getElementById(canvasId);
        canvas.height = 140;
        canvas.width = 280;

        DRAG = new GardenmapCanvasCom.canv(canvasId, ctx, 20,canvas.width, canvas.height, 0, 0, GardenmapList, jsonFlowObj);

        // imageファイルの取り込み時間の調整
        canvas = document.getElementById(canvasId);

        // DRAG.changeGrSep(parseInt(DRAG.jsonFlowObj.workFlowDesignGride));
        DRAG.blank(canvas.width, canvas.height);
        DRAG.readWorkFlow();
        DRAG.viewL();

	
        // canvas = document.getElementById(canvasId);
// 
        // // DRAG.changeGrSep(parseInt(DRAG.jsonFlowObj.workFlowDesignGride));
        // DRAG.blank(canvas.width, canvas.height);
        // DRAG.readWorkFlow();
        // DRAG.view();

    };

      this.readFlowInfo = function() {
        this.flowInfo = new this.flowInfo(DRAG.jsonFlowObj.flowInstanceId, DRAG.jsonFlowObj.subGyoumuCode, DRAG.jsonFlowObj.subGyoumuName,DRAG.jsonFlowObj.startedMenu,DRAG.jsonFlowObj.flowStartTime,DRAG.jsonFlowObj.flowEndTime,DRAG.jsonFlowObj.startedUserName);
        
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
})(jQuery);

