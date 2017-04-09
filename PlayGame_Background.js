function PGBackground()
{
    this.imgBackground00 = resourcePreLoader.GetImage("img/game_background00.png");
    this.imgBackground01 = resourcePreLoader.GetImage("img/game_background01.png");
    this.imgBackground02 = resourcePreLoader.GetImage("img/game_background02.png");
    this.imgBackground03 = resourcePreLoader.GetImage("img/game_background03.png");
    
    // 초깃값 설정
    this.Init();
}

PGBackground.prototype.Init = function( )
{
    // 초깃값 설정
    this.pos01 = 400;
    this.pos02 = 0;
    this.pos03 = 0;
    
    // 배경별 스크롤링 속도
    this.speed01 = 1;
    this.speed02 = 2;
    this.speed03 = 3;
}

PGBackground.prototype.Update = function( )
{
    this.pos01 -=  this.speed01;
    if( this.pos01 < -900 )
    {
        this.pos01 = 400; 
    }
    this.pos02 -=  this.speed02;
    if( this.pos02 < -261 )
    {
        this.pos02 += 261; 
    }
    this.pos03 -=  this.speed03;
    if( this.pos03 < -261 )
    {
        this.pos03 += 261; 
    }
}

PGBackground.prototype.RenderLayerFront = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    for(var i = 0; i < 5; i++ )
    {
        Context.drawImage( this.imgBackground03, this.pos03 + 261 * i, 0 );
    }
}

PGBackground.prototype.RenderLayerBack = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    Context.drawImage( this.imgBackground00, 0, 0 );
    Context.drawImage( this.imgBackground01, this.pos01, 0 );
    for(var i = 0; i < 5; i++ )
    {
        Context.drawImage( this.imgBackground02, this.pos02 + 261 * i, 0 );
    }
    for(var i = 0; i < 5; i++ )
    {
        Context.drawImage( this.imgBackground03, this.pos03 + 261 * i, 0 );
    }
}



