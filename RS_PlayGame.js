var playGameState;

function PlayGameState()
{
    this.background = new PGBackground();
    this.playground = new PGPlayground();  // speed 10
    this.player     = new PGPlayer();
    this.score      = 0;
    this.isGameOver = false;

    this.isGameClear = false; // 게임클리어
    this.scoreIndex = 0; // 스코어 배열의 인덱스
    this.showMessageFramesCount = 0; //메시지프레임카운트

    playGameState = this;
}



// 초기화용도의 init에 소스를 넣어 매 실행시 초기화해줌
PlayGameState.prototype.Init = function( )
{
    this.showMessageFramesCount = 0; // 메시지프레임카운트 초기화
    this.scoreArray = new Array();
    this.scoreArray.push(100);   // push 메서드로 배열에 값을 추가.
    this.scoreArray.push(200);   // 레벨업할 스코어 점수 조건을 값으로 준다.
    this.scoreArray.push(300);
    this.scoreArray.push(400);
    this.scoreArray.push(500);

    this.scoreIndex = 0; //초기화시 배열도 0으로 초기화


}



PlayGameState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    // 후방 배경 화면 그리기
    this.background.RenderLayerBack();
    this.playground.Render( );
    this.player.Render( );
    // 전방 배경 화면 그리기
    this.background.RenderLayerFront();
    // 점수 표시
    Context.fillStyle = "#000000";
    Context.font = '45px Arial';
    Context.textBaseline = "top";
    Context.fillText( "SCORE :" + this.score, 5, 5 );

    //Context.scale(2.0 - (this.showMessageFramesCount / 60), 2.0 - (this.showMessageFramesCount / 60));
    //스케일 = 확대조절

    //showMessageFramesCount 가 0보다 큰 경우에만 메시지 출력(타이머개념)-------------------------
    if(this.showMessageFramesCount-- > 0)
    {
        Context.save(); // 현재의 상태를 Stack에 집어넣는다.
        Context.translate(300, 60); //기준점을 변경 // 화면을 움직이는상태에서 글자고정
        Context.fillText("레벨업!! 속도가 증가해요!!", -120, 0);
        Context.restore(); // Stack에 저장된 Context 상태를 복원
    }


// 스코어배열인덱스 < 배열길이 &&   // 현재 인덱스가 점수배열의 길이를 넘지 않도록
// 현재점수 >= 스코어 배열 조건점수 값 &&
// 기존스피드값 10 < (12+(현재 인덱스 * 4))  0일때는 12, 1일때는 16, 2일떄는 20
    if(this.scoreIndex < this.scoreArray.length &&
       this.score >= this.scoreArray[this.scoreIndex] &&
       this.playground.speed < (12 + (this.scoreIndex * 4)))
    {
        this.showMessageFramesCount = 45;
        //초당 30프레임. 45값을 주면 1.5초동안 화면에 띄움
         //레벨업하면 showMessageFramesCount값을 45줘서 0이 될동안 메시지를 출력하는 방식
         // 기존스피드값에 계속 대입 = 12+(인덱스++ *3) 0일때는 12, 1일때는 15, 2일때는 18
        this.playground.speed = 12 + (this.scoreIndex++ * 3);
    }
//-----------------------------------------------------------------------------------------

    if( this.isGameOver )
    {
        Context.drawImage(resourcePreLoader.GetImage("img/game_gameover.png"), 0, 0);
    }

    if(this.score===300){ // 게임클리어조건 -----------------------------------------------
      this.isGameClear=true;
    if( this.isGameClear)  // 게임클리어변수가 true일 경우에
    {
      Context.drawImage(resourcePreLoader.GetImage("img/GameClear.png"), 0, 0);
      soundSystem.backgroundMusic.sound.pause();
      soundSystem.backgroundMusic=soundSystem.PlaySound("sound/GameClear.mp3", 2);
    }
  }
}

PlayGameState.prototype.Update = function( )
{
    if( this.isGameOver )
    {
        if( inputSystem.isKeyDown( 13 ) )
        {
            this.Restart();
        }
        return;
    }
if(this.isGameClear){
  return;
}

  /////// 움직이는 객체만 정지상태로 만듬
    this.background.Update();
    this.playground.Update();
    this.player.Update();
    this.playground.CheckCollision( this.player.collisionBox );
}



PlayGameState.prototype.Restart = function( )
{
    this.background.Init();
    this.playground.Init();
    this.player.Init();
    this.Init();


    this.sprPlayer = new SpriteAnimation(             // 점프이미지를 추가했기때문에
    resourcePreLoader.GetImage("img/game_player.png"),// 게임 재시작시 이미지를 기본이미지로
         156 , 222 , 4 , 8 );

    this.score      = 0;
    this.isGameClear = false; // 게임 클리어 플래그 false ;
    this.isGameOver = false;
}


PlayGameState.prototype.Notification = function( msg )
{
    switch( msg )
    {
        case "COLLISION_ELEGATOR":
        // 악어와 충돌 : 게임 오버
        this.isGameOver = true;
        break;
        case "PLAYER_GET_COIN":
        // 코인을 습득하면 10점 추가
        this.score += 10;

        break;
    }
}
