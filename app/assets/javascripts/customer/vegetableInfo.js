/* 野菜情報クラス　 */
var VegetableInfo = {}; // namespace
var spaceStr = "&nbsp;&nbsp;&nbsp;";


/* イチゴ */
VegetableInfo.getStrawberryParamHTML = function(language) {
	// イチゴの説明
    var planBody;
    if (language === "ja") {
    	planBody = "<legend>イチゴ</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_strawberry_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='30ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='8' height='80' value='15°～25°' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='-' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='20' height='80' value='ビタミンCが豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='5' cols='80' wrap='soft' disabled='true')>イチゴは種子ではなく、株からする子苗を生産に利用します。&#13;秋に花芽を作り、春に開花結実します。また、春～夏に長いつる（ランナー）が発生し子苗をつけていきます。&#13;休眠は１０月から始まり１月中には休眠打破が完了します。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Strawberry</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_strawberry_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='3' height='80' value='30ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='15～25℃' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='-' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='20' height='80' value='ビタミンCが豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='5' cols='80' wrap='soft' disabled='true')>イチゴは種子ではなく、株からする子苗を生産に利用します。&#13;秋に花芽を作り、春に開花結実します。また、春～夏に長いつる（ランナー）が発生し子苗をつけていきます。&#13;休眠は１０月から始まり１月中には休眠打破が完了します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};
/* キャベツ　 */
VegetableInfo.getCabbageParamHTML = function(language) {
	// キャベツの説明
    var paramDataHTML = 
    "<div id ='taskParamViewDiv'>" +
    "<fieldset>" +
      "<legend>キャベツ</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_cabbage_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='35ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='3' height='80' value='20℃' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='-' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='20' height='80' value='ビタミンUが豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='5' cols='80' wrap='soft' disabled='true')>キャベツには胃や十二指腸のかいようを直すと言われるビタミンUが豊富に含まれています。&#13;耐寒性は－１０℃まで耐えられます。</textarea></h2>" + 
    "</fieldset></div>"; 
        return paramDataHTML;
};
/* トマト　 */
VegetableInfo.getTomatoParamHTML = function(language) {
	// トマトの説明
    var planBody;
    if (language === "ja") {
    	planBody = "<legend>トマト</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_tomato_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='60ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='昼20°～30°、夜10～20℃' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='弱酸性、通気性、排水性のよい土質' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='34' height='80' value='カロテン、ビタミンC、クエン酸、リンゴ酢が豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='7' cols='80' wrap='soft' disabled='true')>高血圧を抑制したり、消化を助ける働きがあります。&#13;またトマトの赤色の元になるリコピンは活性酸素を除去する働きもあります。&#13;降雨によって裂果しやすいので雨よけ栽培が適しています。&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Tomato</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_tomato_calendar_en.bmp' >" +
      "<h2>Interval between the seedings<input align='left' type='text' size='3' height='80' value='60cm' disabled='true')\">"+
      spaceStr + "Growth right temperature<input align='left' type='text' size='25' height='80' value='daytime:20°- 30°, night:10°- 20°' disabled='true')\">" +
      "Adaptation soil<input align='left' type='text' size='53' height='80' value='Slight acidic,soil is air thought and drained.' disabled='true')\"><br>" + 
      "Nutrient<input align='left' type='text' size='60' height='80' value='be rich in carotene, Vitamin C, Citric acid, and Apple-cider vinegar.' disabled='true')\">" + 
      "<h2>Characteristic<textarea rows='7' cols='80' wrap='soft' disabled='true')>Tomatoes are rich in lycopene witch has been shown to help reduce blood pressure, and active oxygen.&#13;Tomato is good digestion for you.&#13;rain cover cultivation is the best for growing tomatoes, because heavy rain is the leading cause of fruit cracking.&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};

/* バジル　 */
VegetableInfo.getBasilParamHTML = function(language) {
	// バジルの説明
    var planBody;
    if (language === "ja") {
    	planBody = "<legend>バジル</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_basil_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='45ｃｍ' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='20°～30°' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='保水性、排水性のよい土質' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='34' height='80' value='βカロテン、ビタミンEが豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='7' cols='80' wrap='soft' disabled='true')>バジルはβカロテンが豊富でまた、ビタミンEも多いほうなので免疫力を高める効果があり、&#13;抗酸化作用（アンチエイジング）があるといわれています。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Basil</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_basil_calendar_en.bmp' >" +
      "<h2>Interval between the seedings<input align='left' type='text' size='3' height='80' value='60cm' disabled='true')\">"+
      spaceStr + "Growth right temperature<input align='left' type='text' size='25' height='80' value='daytime:20°- 30°, night:10°- 20°' disabled='true')\">" +
      "Adaptation soil<input align='left' type='text' size='53' height='80' value='Slight acidic,soil is air thought and drained.' disabled='true')\"><br>" + 
      "Nutrient<input align='left' type='text' size='60' height='80' value='be rich in carotene, Vitamin C, Citric acid, and Apple-cider vinegar.' disabled='true')\">" + 
      "<h2>Characteristic<textarea rows='7' cols='80' wrap='soft' disabled='true')>Tomatoes are rich in lycopene witch has been shown to help reduce blood pressure, and active oxygen.&#13;Tomato is good digestion for you.&#13;rain cover cultivation is the best for growing tomatoes, because heavy rain is the leading cause of fruit cracking.&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};
/* マリーゴールド　 */
VegetableInfo.getMarigoldParamHTML = function(language) {
	// マリーゴールドの説明
    var planBody;
    if (language === "ja") {
    	planBody = "<legend>マリーゴールド</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_marigold_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='-' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='-' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='排水性のよい土質' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='34' height='80' value='-' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='7' cols='80' wrap='soft' disabled='true')>マリーゴールドには土中のセンチュウ（害虫）密度を下げる効果があります。訪問昆虫を集め、天敵の墨かにもなり野菜の成長を助けます。&#13;マリーゴールドは水を吸う力が強く、切り花にも適しています。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Basil</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_basil_calendar_en.bmp' >" +
      "<h2>Interval between the seedings<input align='left' type='text' size='3' height='80' value='60cm' disabled='true')\">"+
      spaceStr + "Growth right temperature<input align='left' type='text' size='25' height='80' value='daytime:20°- 30°, night:10°- 20°' disabled='true')\">" +
      "Adaptation soil<input align='left' type='text' size='53' height='80' value='Slight acidic,soil is air thought and drained.' disabled='true')\"><br>" + 
      "Nutrient<input align='left' type='text' size='60' height='80' value='be rich in carotene, Vitamin C, Citric acid, and Apple-cider vinegar.' disabled='true')\">" + 
      "<h2>Characteristic<textarea rows='7' cols='80' wrap='soft' disabled='true')>Tomatoes are rich in lycopene witch has been shown to help reduce blood pressure, and active oxygen.&#13;Tomato is good digestion for you.&#13;rain cover cultivation is the best for growing tomatoes, because heavy rain is the leading cause of fruit cracking.&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};

/* ホウレンソウ　 */
VegetableInfo.getSpinachParamHTML = function(language) {
	// ホウレンソウの説明
    var planBody;
    if (language === "ja") {
    	planBody = "<legend>ホウレンソウ::アカザ科</legend>" +
      "<h2>難易度<h_star>★</h_star>☆☆☆☆</h2>"+
      "<img border='0' src='/assets/gardenplans/cultivate_marigold_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='-' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='16°～20°' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='適性pH6.5～7、保水性、排水性のよい土質' disabled='true')\">" + 
      spaceStr + "栄養素<input align='left' type='text' size='34' height='80' value='鉄分、カロテノイド類、ビタミンB1、B2やミネラル、カルシウム、葉酸が豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='7' cols='80' wrap='soft' disabled='true')>ホウレンソウは葉が薄くあくが少ない東洋種（おひたし、炒め物、汁の実）と、&#13;葉肉が厚く食味に土くささがある西洋種（バター炒め）がある。&#13;鉄分を多く含んでいるので貧血に効果がある。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Spinach</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_basil_calendar_en.bmp' >" +
      "<h2>Interval between the seedings<input align='left' type='text' size='3' height='80' value='60cm' disabled='true')\">"+
      spaceStr + "Growth right temperature<input align='left' type='text' size='25' height='80' value='daytime:20°- 30°, night:10°- 20°' disabled='true')\">" +
      "Adaptation soil<input align='left' type='text' size='53' height='80' value='Slight acidic,soil is air thought and drained.' disabled='true')\"><br>" + 
      "Nutrient<input align='left' type='text' size='60' height='80' value='be rich in carotene, Vitamin C, Citric acid, and Apple-cider vinegar.' disabled='true')\">" + 
      "<h2>Characteristic<textarea rows='7' cols='80' wrap='soft' disabled='true')>Tomatoes are rich in lycopene witch has been shown to help reduce blood pressure, and active oxygen.&#13;Tomato is good digestion for you.&#13;rain cover cultivation is the best for growing tomatoes, because heavy rain is the leading cause of fruit cracking.&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};


/* 春菊　 */
VegetableInfo.getGarlandChrysanthemunParamHTML = function(language) {
	// 春菊の説明
    var planBody;
    if (language === "ja") {
      planBody = "<legend>春菊::キク科</legend>" +
      "<h2>難易度<h_star>★</h_star>☆☆☆☆</h2>"+
      "<img border='0' src='/assets/gardenplans/cultivate_garlandChrysanthemun_calendar.bmp' >" +
      "<h2>苗の間隔<input align='left' type='text' size='8' height='80' value='-' disabled='true')\">"+
      spaceStr + "生育適温<input align='left' type='text' size='25' height='80' value='15°～20°' disabled='true')\"></h2>" +
      "<h2>適応土壌<input align='left' type='text' size='30' height='80' value='適性pH6.5～7、保水性、排水性のよい土質' disabled='true')\"><br/>" + 
      "栄養素" + spaceStr + "<input align='left' type='text' size='34' height='80' value='カロチン、ミネラル（ｶﾙｼｳﾑ、ﾏｸﾞﾈｼｳﾑ、ﾘﾝ、鉄分）が豊富' disabled='true')\"></h2>" + 
      "<h2>特徴<br><textarea rows='7' cols='80' wrap='soft' disabled='true')>春菊は暑さに強く、また0℃以下でも枯れません。&#13;ヨーロッパでは、野菜としてではなく観賞用として栽培されているので花を咲かせてみてもよいでしょう。&#13;春菊に含まれている香り成分は自律神経に作用し、胃腸を活性化し､咳や痰を抑える効果があるそうです。&#13;カリウム・・・ナトリウム（塩分）を排泄する役割があり、高血圧の予防に効果があります。&#13;ミネラル・・・カルシウムをはじめ、マグネシウム、リン、鉄分などが豊富でどれも骨を生成する上で欠かせない成分です。&#13;β-タカロチン・・・抗発ガン作用や免疫賦活作用で知られていますが､その他にも体内でビタミンＡに変換され、髪の健康維持や、視力維持、粘膜や皮膚の健康維持、そして､喉や肺など呼吸器系統を守る働きがあるといわれています。</textarea></h2>"; 
    } else {
    	planBody = "<legend>Spinach</legend>" +
      "<img border='0' src='/assets/gardenplans/cultivate_basil_calendar_en.bmp' >" +
      "<h2>Interval between the seedings<input align='left' type='text' size='3' height='80' value='60cm' disabled='true')\">"+
      spaceStr + "Growth right temperature<input align='left' type='text' size='25' height='80' value='daytime:20°- 30°, night:10°- 20°' disabled='true')\">" +
      "Adaptation soil<input align='left' type='text' size='53' height='80' value='Slight acidic,soil is air thought and drained.' disabled='true')\"><br>" + 
      "Nutrient<input align='left' type='text' size='60' height='80' value='be rich in carotene, Vitamin C, Citric acid, and Apple-cider vinegar.' disabled='true')\">" + 
      "<h2>Characteristic<textarea rows='7' cols='80' wrap='soft' disabled='true')>Tomatoes are rich in lycopene witch has been shown to help reduce blood pressure, and active oxygen.&#13;Tomato is good digestion for you.&#13;rain cover cultivation is the best for growing tomatoes, because heavy rain is the leading cause of fruit cracking.&#13;給肥力が強いので元肥を少なく、追肥を中心に施肥します。</textarea></h2>"; 
    }
    var paramDataHTML = "<div id ='taskParamViewDiv'>" +
    "<fieldset>" + planBody + "</fieldset></div>";
    return paramDataHTML;
};
