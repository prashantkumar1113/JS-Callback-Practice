function move(element) {
    element.style.position = "fixed";

    function moveToCoordinates(left, bottom) {
        element.style.left = left + "px";
        element.style.bottom = bottom + "px";
    }

    function moveWithArrowKeys(left, bottom, callback) {
        let direction = null;
        let x = left;
        let y = bottom;
        element.style.left = x + "px";
        element.style.bottom = y + "px";

        function moveCharacter() {
            if (
                x >= 0 &&
                y >= 0 &&
                x <= window.innerWidth - 50 &&
                y <= window.innerHeight - 50
            ) {
                if (direction === "west") {
                    x = x - 1;
                }
                if (direction === "north") {
                    y = y + 1;
                }
                if (direction === "east") {
                    x = x + 1;
                }
                if (direction === "south") {
                    y = y - 1;
                }
                element.style.left = x + "px";
                element.style.bottom = y + "px";
                // console.log(`x=${x} y=${y}`);
                // console.log(window.innerWidth + " " + window.innerHeight);
            } else {
                if (x < 0) {
                    x = 0;
                }
                if (y < 0) {
                    y = 0;
                }
                if (x > window.innerWidth - 50) {
                    x = window.innerWidth - 50;
                }
                if (y > window.innerHeight - 50) {
                    y = window.innerHeight - 50;
                }
            }
        }

        setInterval(moveCharacter, 1);

        document.addEventListener("keydown", function (e) {
            if (e.repeat) return;

            if (e.key === "ArrowLeft") {
                direction = "west";
            }
            if (e.key === "ArrowUp") {
                direction = "north";
            }
            if (e.key === "ArrowRight") {
                direction = "east";
            }
            if (e.key === "ArrowDown") {
                direction = "south";
            }
            // console.log("callback " + typeof callback);
            if (typeof callback === "function") {
                callback(direction);
            }
        });

        document.addEventListener("keyup", function (e) {
            direction = null;
            if (typeof callback === "function") {
                callback(direction);
            }
        });
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys,
    };
}
