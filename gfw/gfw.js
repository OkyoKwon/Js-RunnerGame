function onGameInit()
{
    document.title = "보물을 향해!";

    GAME_FPS = 30;
    debugSystem.debugMode = true;

    ///////////////추가 시킨 이미지와 사운드 ///////////////////////////////
    resourcePreLoader.AddImage("img/game_player_jump2.png"); // 2단점프 이미지
    resourcePreLoader.AddImage("img/GameClear.png"); // 게임클리어 이미지
    soundSystem.AddSound("sound/GameClear.mp3", 2); // 게임클리어시 사운드

    // 리소스 프리로딩 추가
    resourcePreLoader.AddImage( "img/title_background.png" );
    resourcePreLoader.AddImage( "img/title_start_off.png" );
    resourcePreLoader.AddImage( "img/title_start_on.png" );
    resourcePreLoader.AddImage( "img/title_battle_off.png" );
    resourcePreLoader.AddImage( "img/title_battle_on.png" );
    resourcePreLoader.AddImage( "img/title_ranking_off.png" );
    resourcePreLoader.AddImage( "img/title_ranking_on.png" );
    resourcePreLoader.AddImage( "img/title_credit_off.png" );
    resourcePreLoader.AddImage( "img/title_credit_on.png" );
    resourcePreLoader.AddImage( "img/game_background00.png" );
    resourcePreLoader.AddImage( "img/game_background01.png" );
    resourcePreLoader.AddImage( "img/game_background02.png" );
    resourcePreLoader.AddImage( "img/game_background03.png" );
    resourcePreLoader.AddImage( "img/game_crocodile.png" );
    resourcePreLoader.AddImage( "img/game_box.png" );
    resourcePreLoader.AddImage( "img/game_player.png" );
    resourcePreLoader.AddImage( "img/game_gameover.png" );
    resourcePreLoader.AddImage( "img/game_item_coin.png" );
    resourcePreLoader.AddImage( "img/game_item_chest.png" );
    soundSystem.AddSound( "sound/background.mp3", 1 );
    ///////////////////////////////////////////////////////////////////////



    // 게임 초기 시작 상태 설정
    after_loading_state = new TitleState();
    setInterval( gameLoop, 1000 / GAME_FPS );
}


window.addEventListener("load", onGameInit, false);
