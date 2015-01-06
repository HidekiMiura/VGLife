/* 野菜情報クラス　 */
var VegetableInfo = {}; // namespace

VegetableInfo.getStrawberryParamHTML = function() {
	var spaceStr = "&nbsp;&nbsp;&nbsp;"
	// イチゴの説明
    var paramDataHTML = 
    "<div id ='taskParamViewDiv'>" +
    "<fieldset>" +
      "<legend>イチゴ情報</legend>" +
      "<img border='0' src='/assets/cultivate_strawberry.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='30ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='8' height='80' value='１５～２５℃' disabled='true')\">" +
      spaceStr + "栄養素<input align='left' type='text' size='20' height='80' value='ビタミンCが豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<textarea rows='5' cols='92' wrap='soft' disabled='true')>イチゴは種子ではなく、株からする子苗を生産に利用します。&#13;秋に花芽を作り、春に開花結実します。また、春～夏に長いつる（ランナー）が発生し子苗をつけていきます。&#13;休眠は１０月から始まり１月中には休眠打破が完了します。</textarea></h2>" + 
    "</fieldset></div>"; 
        return paramDataHTML;
};
