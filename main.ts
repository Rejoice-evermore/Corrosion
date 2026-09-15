/**
 * x=10 to 150
 * 
 * y=10 to 110
 */
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.coral5, function (sprite, location) {
    music.stopAllSounds()
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles0, function (sprite, location) {
    music.stopAllSounds()
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile13, function (sprite, location) {
    music.stopAllSounds()
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    music.stopAllSounds()
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.createSong(hex`0078000408020105001c000f0a006400f4010a0000040000000000000000000000000000000002060000000400012c`), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
})
let projectile: Sprite = null
let projectile2: Sprite = null
let mySprite2: Sprite = null
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . 9 8 1 9 8 1 9 . . . . . 
    . . . . 9 8 8 9 8 8 9 . . . . . 
    . . . . 3 9 9 9 9 9 3 . . . . . 
    . . . . 9 9 8 9 8 9 9 . . . . . 
    . . . . 9 9 9 8 9 9 9 . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.sayText("Help me avoid getting rusted!", 2000, false)
controller.moveSprite(mySprite)
music.play(music.createSong(hex`0078000408020103001c0001dc00690000045e0100040000000000000000000005640001040003360000000400012008000c00012910001400012718001c0001291c002000012720002400012928002c00012530003400012538003c00012c`), music.PlaybackMode.LoopingInBackground)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
game.onUpdate(function () {
    if (info.score() >= 30) {
        game.gameOver(true)
        game.setGameOverEffect(true, effects.confetti)
        music.play(music.createSong(hex`0078000408020105001c000f0a006400f4010a00000400000000000000000000000000000000021e0004000800012c08000c00012c0c001000012c10001400012c18001c00012c`), music.PlaybackMode.UntilDone)
    }
})
game.onUpdate(function () {
    game.setGameOverEffect(false, effects.dissolve)
})
game.onUpdateInterval(2000, function () {
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 9 9 . . . . . . . 
        . . . . . . . 9 9 . . . . . . . 
        . . . . . . 9 9 9 9 . . . . . . 
        . . . . . . 9 6 6 9 . . . . . . 
        . . . . . 9 f 6 6 f 9 . . . . . 
        . . . . . 9 9 1 6 1 9 . . . . . 
        . . . . 9 9 6 6 6 6 9 9 . . . . 
        . . . . 9 9 6 6 6 6 1 9 . . . . 
        . . . . 9 9 1 1 1 1 1 9 . . . . 
        . . . . 9 9 6 6 6 6 9 9 . . . . 
        . . . . 9 9 9 9 9 9 9 . . . . . 
        . . . . . 9 9 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    mySprite2.follow(mySprite, 40)
    mySprite2.setPosition(0, 0)
})
game.onUpdateInterval(1000, function () {
    projectile2 = sprites.create(assets.image`SprayBottle`, SpriteKind.Food)
    projectile2.setPosition(randint(0, 600), randint(0, 640))
})
game.onUpdateInterval(100, function () {
    projectile = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 1 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        . . . . 1 1 1 d d 1 1 1 . . . . 
        . . 1 1 1 1 1 d 1 1 1 1 1 . . . 
        . . 1 1 1 1 d d 1 1 1 1 1 . . . 
        . 1 1 1 1 1 d 1 1 1 1 1 1 . . . 
        . 1 1 1 1 1 d 1 1 1 1 1 1 . . . 
        . 1 1 1 1 1 1 . . 1 1 1 1 1 . . 
        . 1 1 1 1 1 . . . . 1 1 1 1 . . 
        . 1 1 1 1 . . . . . . 1 1 1 . . 
        1 1 . . . . . . . . . . 1 1 . . 
        `, SpriteKind.Food)
    projectile.setPosition(randint(0, 600), randint(0, 640))
})
