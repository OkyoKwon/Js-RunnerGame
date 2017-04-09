function PGPlayground()
{
    this.imgBox = resourcePreLoader.GetImage("img/game_box.png");
    this.imgCrocodile = resourcePreLoader.GetImage("img/game_crocodile.png");
    this.intBoxY = 600 - 136 - 20;
    this.intCrocodileY = 600 - 186 - 30;

    this.Init();
}

PGPlayground.prototype.Init = function( )
{
    this.lastObj = null;
    this.arrObjects = new Array();
    this.speed = 10;

    // 우리가 정한 반복 규칙
    this.AddObject( "box" );
    this.AddItem( "coin" );
    this.AddObject( "box" );
    this.AddItem( "coin" );
    this.AddObject( "box" );
    this.AddItem( "coin" );
    this.AddObject( "crocodile" );
    this.AddItem( "coin" );
    this.AddObject( "box" );
    this.AddItem( "coin" );
    this.AddObject( "box" );
    this.AddItem( "coin" );
    this.AddObject( "crocodile" );
    this.AddItem( "coin" );
}



PGPlayground.prototype.AddObject = function( type )
{
    var obj;
    if( type == "box" )
    {
        obj = new GraphicObject( this.imgBox );
        obj.SetPosition( 0, this.intBoxY );
        obj.type = "box";
        if( this.lastObj )
            this.GotoLastPosition( obj );
    }
    else if( type == "crocodile" )
    {
        obj = new SpriteAnimation( this.imgCrocodile, 97 , 186 , 2 , 2 );
        obj.SetPosition( 0, this.intCrocodileY );
        obj.type = "crocodile";
        if( this.lastObj )
            this.GotoLastPosition( obj );
    }

    this.arrObjects.push( obj );
    this.lastObj = obj;

}




PGPlayground.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");

    for( var i = 0; i < this.arrObjects.length; i++ )
    {
       this.arrObjects[i].Render( Context );
    }
}

PGPlayground.prototype.Update = function( )
{
    console.log(playGameState);
    for( var i = 0; i < this.arrObjects.length; i++ )
    {
       var obj = this.arrObjects[i];
       obj.Translate( -this.speed , 0 );
       if( obj.Update )
            obj.Update();
       if( obj.x < -237 )
       {
           this.GotoLastPosition( obj );
           obj.Translate( -this.speed , 0 );
           if( obj.type != "item" )
               this.lastObj = obj;
       }
    }
    this.arrObjects.sort( function( obj1, obj2 ){ return obj1.x - obj2.x } );

}

PGPlayground.prototype.GotoLastPosition = function( obj )
{
    if( obj.type == "box" )
    {
        if( this.lastObj.type == "crocodile" )
             obj.SetPosition( this.lastObj.x + 97, this.intBoxY );
        else
             obj.SetPosition( this.lastObj.x + 237 - 26, this.intBoxY );
    }
    else if( obj.type == "crocodile" )
    {
        obj.SetPosition( this.lastObj.x + 237, this.intCrocodileY );
    }
    else if( obj.type == "item" )
    {
        obj.isGet = false;
        if( this.lastObj.type == "box" )
             obj.SetPosition( this.lastObj.x + 100, this.intBoxY - 40 );
        else if( this.lastObj.type == "crocodile" )
             obj.SetPosition( this.lastObj.x + 20, this.intCrocodileY - 40 );
    }
}


PGPlayground.prototype.CheckCollision = function( player )
{
    for( var i = 0; i < this.arrObjects.length; i++ )
    {
        var obj = this.arrObjects[i];
        if( obj.type == "crocodile" )
        {
            var collisionBox
    = {left: obj.x + 15,top : obj.y + 10, right: obj.x + 85, bottom: obj.y + 175 };
            if( collisionBox.left < player.right && collisionBox.bottom > player.top
             && collisionBox.right > player.left && collisionBox.top < player.bottom )
            {
                playGameState.Notification( "COLLISION_ELEGATOR" );
            }
        }
        if( obj.type == "item" )
        {
            obj.CheckCollision( player );
        }
    }
}


PGPlayground.prototype.AddItem = function( type )
{
    var obj;
    if( type == "coin" )
    {
        obj = new ItemCoin( );
        if( this.lastObj )
            this.GotoLastPosition( obj );
    }

    this.arrObjects.push( obj );
}
