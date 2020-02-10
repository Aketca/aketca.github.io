$(document).ready(function(){
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /*--------------------- pixi init №1-----------------------------------*/
    var appInit = new PIXI.Application(640, 360);
    document.getElementById('canvas-wrap-1').appendChild(appInit.view);

    var circle = new PIXI.Graphics();
    circle.beginFill(0x5cafe2);
    circle.drawCircle(0, 0, 80);
    circle.x = 320;
    circle.y = 180;
    appInit.stage.addChild(circle);

    /*---------------------------- pixi cursor effect №2-------------------------------*/
    const app = new PIXI.Application({ backgroundColor: 0x1099bb });
    document.getElementById('canvas-wrap-2').appendChild(app.view);

// Get the texture for rope.
    const trailTexture = PIXI.Texture.from('images/cursor.png');
    const historyX = [];
    const historyY = [];
// historySize determines how long the trail will be.
    const historySize = 20;
// ropeSize determines how smooth the trail will be.
    const ropeSize = 100;
    const points = [];

// Create history array.
    for (let i = 0; i < historySize; i++) {
        historyX.push(0);
        historyY.push(0);
    }
// Create rope points.
    for (let i = 0; i < ropeSize; i++) {
        points.push(new PIXI.Point(0, 0));
    }

// Create the rope
    const rope = new PIXI.SimpleRope(trailTexture, points);

// Set the blendmode
    rope.blendmode = PIXI.BLEND_MODES.ADD;

    app.stage.addChild(rope);

// Listen for animate update
    app.ticker.add((delta) => {
        // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
        // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
        const mouseposition = app.renderer.plugins.interaction.mouse.global;

        // Update the mouse values to history
        historyX.pop();
        historyX.unshift(mouseposition.x);
        historyY.pop();
        historyY.unshift(mouseposition.y);
        // Update the points to correspond with history.
        for (let i = 0; i < ropeSize; i++) {
            const p = points[i];

            // Smooth the curve with cubic interpolation to prevent sharp edges.
            const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
            const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

            p.x = ix;
            p.y = iy;
        }
    });

    /**
     * Cubic interpolation based on https://github.com/osuushi/Smooth.js
     */
    function clipInput(k, arr) {
        if (k < 0) k = 0;
        if (k > arr.length - 1) k = arr.length - 1;
        return arr[k];
    }

    function getTangent(k, factor, array) {
        return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
    }

    function cubicInterpolation(array, t, tangentFactor) {
        if (tangentFactor == null) tangentFactor = 1;

        const k = Math.floor(t);
        const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
        const p = [clipInput(k, array), clipInput(k + 1, array)];
        t -= k;
        const t2 = t * t;
        const t3 = t * t2;
        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }


    /*---------------------------- pixi space effect №3-------------------------------*/

    const appSpace = new PIXI.Application();
    document.getElementById('canvas-wrap-3').appendChild(appSpace.view);

// Get the texture for rope.
    const starTexture = PIXI.Texture.from('images/star.png');

    const starAmount = 1000;
    let cameraZ = 0;
    const fov = 20;
    const baseSpeed = 0.025;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;


// Create the stars
    const stars = [];
    for (let i = 0; i < starAmount; i++) {
        const star = {
            sprite: new PIXI.Sprite(starTexture),
            z: 0,
            x: 0,
            y: 0,
        };
        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        appSpace.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

// Change flight speed every 5 seconds
    setInterval(() => {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);

// Listen for animate update
    appSpace.ticker.add((delta) => {
        // Simple easing. This should be changed to proper easing function when used for real.
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        for (let i = 0; i < starAmount; i++) {
            const star = stars[i];
            if (star.z < cameraZ) randomizeStar(star);

            // Map star 3d position to 2d with really simple projection
            const z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * appSpace.renderer.screen.width + appSpace.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * appSpace.renderer.screen.width + appSpace.renderer.screen.height / 2;

            // Calculate star scale & rotation.
            const dxCenter = star.sprite.x - appSpace.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - appSpace.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * starBaseSize;
            // Star is looking towards center so that y axis is towards center.
            // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
            star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / appSpace.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });

});
