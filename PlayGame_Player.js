function PGPlayer()
{
    this.Init();

}

PGPlayer.prototype.Init = function( )
{

  this.sprPlayer = new SpriteAnimation(
  resourcePreLoader.GetImage("img/game_player.png"),
       156 , 222 , 4 , 8 );

    this.x = 50;
    this.y = 255;
    this.isJumping = false;
    this.jumpPower = 0;
    this.Jump2 = false; // 2단점프 플래그 변수
    this.collisionBox
    = {left: this.x + 40,top : this.y + 55, right: this.x + 100, bottom: this.y + 200 };



    this.Invalid();
}


PGPlayer.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");

    this.sprPlayer.Render( Context );
}

PGPlayer.prototype.Update = function( )
{
    this.sprPlayer.Update();
    if( this.isJumping === false)
    {
        if( inputSystem.isKeyDown( 32 ) )
        {
            this.isJumping = true;
            this.jumpPower = -9; //2단점프를 위해 파워 감소
            //이미지변경-------------------------------------------------
this.sprPlayer.img = resourcePreLoader.GetImage("img/game_player_jump2.png"); // 점프이미지 가지고옴

this.sprPlayer.width =156;
this.sprPlayer.height =150;
this.sprPlayer.totalFrameCount =1;
this.sprPlayer.fps =10;
        }
    }
    else
    {
        this.y += this.jumpPower;
        this.jumpPower += 1.5;

        //기존 y값이 255인데 y가 100보다 클 경우 즉 점프를 한 경우면서 중복점프를 방지하기 위해씀.
        //점프 후 2단점프 변수를 다시 false로 하여 다시 점프가능---------------------------------
        if(this.y>100&&this.isJumping===true&&this.Jump2===false&&inputSystem.isKeyDown(32))
             {
                this.jumpPower=-14;
                this.Jump2==true; // 2단점프 변수 true값으로 변경

             }

        if( this.y >= 255 )
        {
            this.y = 255;
            this.isJumping = false;
            this.Jump2=false;
            // 원래대로 이미지----------------------------------------
            this.sprPlayer = new SpriteAnimation(
              resourcePreLoader.GetImage("img/game_player.png"),
              156,222,4,8);

        }
        this.Invalid();

    }

}


PGPlayer.prototype.Invalid = function( )
{
    this.sprPlayer.SetPosition( this.x, this.y );
    this.collisionBox
    = {left: this.x + 40,top : this.y + 55, right: this.x + 100, bottom: this.y + 200 };
}
