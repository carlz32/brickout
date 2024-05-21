# A BRICKOUT GAME

Destory the bricks by hitting them with the balls

## Code Structure

-   game folder
    -   provides basic facilities
        -   [x] **load images**
            -   image's vertices
        -   [x] **drawing capabilities**
            -   [x] draw Image
            -   [x] draw Text
            -   [x] draw Points
        -   [x] **bind keys**
            -   [x] callback queue support
        -   [x] **change scenes**
        -   [ ] **load audios**
        -   [ ] **level editor**
        -   [x] **debug Mode**
            -   [x] pause option
            -   [x] draw box vertices 
-   scene folder
    -   manage different game scenes
-   collide detection
    -   [x] AABB
    -   [x] createBoxVertices
    -   [x] SAT
-   vector2D math