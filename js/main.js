enchant();
window.onload = function() {
    var KumaNum = 20 ; //クマ数
    var kumaList =[] ;  //クマインスタンスを保存しておくリスト
    var hitList =[] ;  //あたり判定用の

    var game = new Game(320, 320); // 表示領域の大きさを設定
    game.fps = 24;                 // ゲームの進行スピードを設定
    game.preload('./img/chara1.png', './img/start.png', './img/gameover.png'); // ゲームに使う素材を、あらかじめ読み込む
    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します
        /**
         * タイトルシーン
         *
         * タイトルシーンを作り、返す関数です。
         */
        var createStartScene = function() {
            var scene = new Scene();                                // 新しいシーンを作る
            // scene.backgroundColor = '#fcc800';                      // シーンの背景色を設定
            scene.backgroundColor = '#fcc8f0';
            // スタート画像設定
            // var startImage = new Sprite(236, 48);                   // スプライトを作る
            scene.addChild(createGameScene());                             // シーンに追加
            // スタート画像にタッチイベントを設定
            // startImage.addEventListener(Event.TOUCH_START, function(e) {
            //     game.replaceScene(creategamescene());    // 現在表示しているシーンをゲームシーンに置き換える
            // });
            // タイトルシーンを返します。
            return scene;
        };

        /**
         * ゲームシーン
         *
         * ゲームシーンを作り、返す関数です。
         */
        var createGameScene = function() {
            var scene = new Scene();                            // 新しいシーンを作る
            scene.backgroundColor = '#fcc8f0';
             
            // var group = new Group() ;
            for(var i=0 ; i < KumaNum ;i++){
                var kuma = createKuma() ;
                // group.addChild(kuma) ;
                kumaList.push(kuma) ;
            }

            for(num in kumaList){
                scene.addChild(kumaList[num]);                               // シーンに追加
                scene.addChild(hitList[num]);                               // シーンに追加
            }

            // シーンに毎フレームイベントを設定
            scene.addEventListener(Event.ENTER_FRAME, function() {
                kumasIntersect() ;
                moveKumas() ;   //すべてのクマを動かす
                isLimitObjectList() ;   //すべてのクマに位置により判定を行う
            });
                
                      
            // scene.addChild(group)  ;

            

            // addEventListenerToKumaList(kumaList) ;
            // くまにタッチイベントを設定する
            return scene;
        };




        /**
         * クマの衝突判定
         */
        function kumasIntersect(){
            for(num in kumaList) {
                for(num2 in kumaList) {
                    if(num != num2){
                        // if( kumaList[num].intersect(kumaList[num2])){
                        //     kumaList[num].backgroundColor = "red"
                        // }
                        if( hitList[num].intersect(hitList[num2])){
                            hitList[num].backgroundColor = "red"
                            hitList[num].opacity = 0.3  // toumeido
                        }

                    }

                }
            }
        }

        /**
         * クマにリスナーを加える
         * ただ、このメソッドは今は使っていない
         */
        function addEventListenerToKumaList(kumaList){
            for(kuma in kumaList){
                kuma.addEventListener(Event.TOUCH_START, function(e) {
                    // label.text = 'スコア: ' + score + '体叩いた！';     // スコアの文言を更新
                    kuma.x = Math.random() * 288;                       // くまの横位置を0～288pxの間にランダムで再設定(ワープ)
                    kuma.y = Math.random() * 288;                       // くまの縦位置を0～288pxの間にランダムで再設定(ワープ)
                    kumaSpeed = Math.random() * 8 - 4;                  // くまのスピードを-4～+4の間でランダムに再設定
                    // くまの移動方向が左ならスプライトを反転させる
                    if (kumaSpeed > 0) {
                        kuma.scaleX = 1;    // 横方向の大きさを1に(通常)
                    } else {
                        kuma.scaleX = -1;   // 横方向の大きさをマイナス1に(反転)
                    }
                });

            }

        }

        /**
         * クマを生成
         */
        function createKuma(){
            var kuma = new Sprite(32, 32);                      // スプライトを作る
            kuma.image = game.assets['./img/chara1.png'];      // くま画像を設定
            kuma.x = Math.random() * 288;                       // くまの横位置を0～288pxの間でランダムに設定
            kuma.y = Math.random() * 288;                       // くまの縦位置を0～288pxの間でランダムに設定
            // kuma.backgroundColor = "blue" ;
            var kumaSpeed = Math.random() * 8 - 4;              // くまのスピードを-4～+4の間でランダムに設定

            //衝突判定用
            var hitobj = new Sprite(10, 29); 
            hitobj.x = Math.random() * 288;                       // くまの横位置を0～288pxの間でランダムに設定
            hitobj.y = Math.random() * 288;                       // くまの縦位置を0～288pxの間でランダムに設定
            hitList.push(hitobj) ;

            return kuma ;
        }

        
        /**
         * すべてのクマを動かす
         */
        function moveKumas(){
            for(num in kumaList) {
                moveKuma2(num) ;
            }
        }

        /**
         * クマを動かす。hitobjも同様に
         */
        function moveKuma2(num){
            kuma = kumaList[num] ;
            hitobj =  hitList[num] ;
            kuma.x += ((Math.random() * 2) -1) * 2 ;
            kuma.y += ((Math.random() * 2) -1) * 2 ;

            hitobj.x = kuma.x +12 ;
            hitobj.y = kuma.y ;
            //以下でクマにアニメーションをつける
            kuma.frame ++ ;
            hitobj.frame ++ ;
            if(kuma.frame > 2){
                kuma.frame = 0 ; 
            }
        }

        /**
         * クマを動かす
         */
        function moveKuma(kuma){
            kuma.x += ((Math.random() * 2) -1) * 2 ;
            kuma.y += ((Math.random() * 2) -1) * 2 ;

            //以下でクマにアニメーションをつける
            kuma.frame ++ ;
            if(kuma.frame > 2){
                kuma.frame = 0 ; 
            }
        }

        /**
         * クマの位置が画面からはみ出ないように調整
         */
        function isLimitObjectList(){
            // for(int i=0 ;i < objectList.size ; i++)  {
            for( num in kumaList) {
                isLimit(kumaList[num])
            }
        }

        /**
         *　枠に収まっているかの判定し、限界であれば調整する
         */
        function isLimit(obj){
            if (obj.x > 320) {             // もしも右端に到達したら
                obj.x = -32;               // 左端にワープさせる
            } else if (obj.x < -32) {      // もしも左端に到達したら
                obj.x = 320;               // 右端にワープさせる
            }

            if (obj.y > 320) {             // もしも右端に到達したら
                obj.y = -32;               // 左端にワープさせる
            } else if (obj.y < -32) {      // もしも左端に到達したら
                obj.y = 320;               // 右端にワープさせる
            }
        }


        /**
         * ゲームオーバーシーン
         *
         * ゲームオーバーシーンを作り、返す関数です。
         * createGameoverScore(※引数) ※引数にスコアを入れると画面にスコアが表示されます
         * ※は任意の名前でOKで、カンマ区切りで複数設定できます。
         * 例) var createGameoverScore = function (resultScore, test1, test2) {
         */
        var createGameoverScene = function(resultScore) {
            var scene = new Scene();                                   // 新しいシーンを作る
            scene.backgroundColor = '#303030';                         // シーンの背景色を設定
            // ゲームオーバー画像設定
            var gameoverImage = new Sprite(189, 97);                   // スプライトを作る
            gameoverImage.image = game.assets['./img/gameover.png'];  // ゲームオーバー画像を設定
            gameoverImage.x = 65;                                      // 横位置調整
            gameoverImage.y = 112;                                     // 縦位置調整
            scene.addChild(gameoverImage);                             // シーンに追加
            // スコアラベル設定
            var label = new Label(resultScore + '体叩いた');            // ラベルを作る スコアを代入
            label.textAlign = 'center';                                // 文字を中央寄せ
            label.color = '#fff';                                      // 文字を白色に
            label.x = 0;                                               // 横位置調整
            label.y = 60;                                              // 縦位置調整
            label.font = '40px sans-serif';                            // 40pxのゴシック体にする
            scene.addChild(label);                                     // シーンに追加
            // リトライラベル(ボタン)設定
            var retryLabel = new Label('もう一度遊ぶ');                  // ラベルを作る
            retryLabel.color = '#fff';                                 // 文字を白色に
            retryLabel.x = 0;                                          // 横位置調整
            retryLabel.y = 300;                                        // 縦位置調整
            retryLabel.font = '20px sans-serif';                       // 20pxのゴシック体にする
            scene.addChild(retryLabel);                                // シーンに追加
            // リトライラベルにタッチイベントを設定
            retryLabel.addEventListener(Event.TOUCH_START, function(e) {
                game.replaceScene(createStartScene());    // 現在表示しているシーンをタイトルシーンに置き換える
            });
            return scene;
        };
        game.replaceScene(createStartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
}
game.start(); // ゲームをスタートさせます
};
