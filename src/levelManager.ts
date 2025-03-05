class LevelManager extends pc.ScriptType {
    sidesCompleted: number = 0;
    levelContainer: pc.Entity;
    isTop: boolean = true;
    playerTop: pc.Entity | null = null;
    playerBottom: pc.Entity | null = null;

    initialize() {     
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

        this.findPlayers();
    }

    update() {
        if (this.sidesCompleted == 2) {
            console.log("[LEVEL] Level complete!");

            // TODO: Add functionality to load the next level.
        }
    }

    onKeyDown(event: pc.KeyboardEvent) {
        if (event.key === pc.KEY_SPACE) {
            console.log("[LEVEL] Turn level");

            this.isTop = !this.isTop;
            this.levelContainer.rotate(180, 0, 0);  

            if (this.playerTop && this.playerBottom) {
                var topPlayerScript = this.playerTop.script?.get('player') as Player | undefined;
                var bottomPlayerScript = this.playerBottom.script?.get('player') as Player | undefined;

                if (topPlayerScript && bottomPlayerScript) {
                    topPlayerScript.isActive = !topPlayerScript.isActive;
                    bottomPlayerScript.isActive = !bottomPlayerScript.isActive;
                }
            }
        }
    }

    findPlayers() {
        this.playerTop = null;
        this.playerBottom = null;

        var playerEntities = this.levelContainer.findByTag('player') as pc.Entity[];

        for (var entity of playerEntities) {
            if (!(entity instanceof pc.Entity)) continue;
            var playerScript = entity.script?.get('player') as Player | undefined;

            if (playerScript) {
                if (playerScript.isTop) {
                    this.playerTop = entity;
                }
                else {
                    this.playerBottom = entity;
                }
            }
        }

        if (this.playerTop && this.playerBottom) {
            console.log("[LEVEL] Found both players!");
        }
        else {
            console.log("[LEVEL] Could not find both players!");
        }
    }
};

pc.registerScript(LevelManager, 'levelManager');
LevelManager.attributes.add('sidesCompleted', { type: 'number' })
LevelManager.attributes.add('levelContainer', { type: 'entity' });