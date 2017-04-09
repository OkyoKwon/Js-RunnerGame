function ItemCoin()
{
    this.sprCoin = new SpriteAnimation(
        resourcePreLoader.GetImage("img/game_item_coin.png"),
         30 , 31 , 4 , 4 );
    this.x = 0;
    this.y = 0;
    this.type = "item";
    this.isGet = false;
    this.Invalid();
}


ItemCoin.prototype.Render = function()
{
    if( this.isGet )
        return;

    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");

    this.sprCoin.Render( Context );
}

ItemCoin.prototype.Update = function()
{
    this.sprCoin.Update();
}

ItemCoin.prototype.SetPosition = function( x, y )
{
    this.sprCoin.SetPosition( x, y );
    this.Invalid();
}

ItemCoin.prototype.Translate = function( x, y )
{
  this.sprCoin.Translate( x, y );
  this.Invalid();
}


ItemCoin.prototype.Invalid = function( )
{
    this.x = this.sprCoin.x;
    this.y = this.sprCoin.y;
    this.collisionBox
    = {left: this.sprCoin.x ,top : this.sprCoin.y ,
        right: this.sprCoin.x + 30, bottom: this.sprCoin.y + 31 };
}

ItemCoin.prototype.CheckCollision = function( player )
{
    if( this.isGet )
        return;
    if( this.collisionBox.left < player.right && this.collisionBox.bottom > player.top
             && this.collisionBox.right > player.left && this.collisionBox.top < player.bottom )
    {
        playGameState.Notification( "PLAYER_GET_COIN" );
        this.isGet = true;
    }
}
