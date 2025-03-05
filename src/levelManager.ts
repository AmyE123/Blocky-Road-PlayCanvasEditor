class LevelManager extends pc.ScriptType {
    sidesCompleted: number = 0;
    levelContainer: pc.Entity;
    isTop: boolean = true;
    playerTop: pc.Entity | null = null;
    playerBottom: pc.Entity | null = null;
    levels: pc.Asset[] = [];
    currentLevelIndex: number = 0;
    currentLevel: pc.Entity | null = null;

    initialize() {     
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

        if (this.levels.length > 0) {
            this.loadLevel(0);
        }
        else {
            console.error("[LEVEL] Levels not assigned in the LevelManager.")
        }
    }

    update() {
        if (this.sidesCompleted == 2) {
            console.log("[LEVEL] Level complete!");
            this.loadNextLevel();         
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
            console.error("[LEVEL] Could not find both players!");
        }
    }

    loadLevel(index: number) {
        if (index >= this.levels.length) {
            console.log("[LEVEL] All levels complete, congrats!!") // TODO: Add completion screen?
            return;
        }

        if (this.currentLevel) {
            this.currentLevel.destroy();
        }

        var newLevel = this.levels[index].resource.instantiate() as pc.Entity;
        this.app.root.addChild(newLevel);
        this.currentLevel = newLevel;
        this.currentLevelIndex = index;

        console.log("[LEVEL] Loaded level ", index);

        this.levelContainer = newLevel.findByTag("levelContainer")[0] as pc.Entity;
        if (!this.levelContainer) {
            console.error("[LEVEL] Level container not found in new level! Add it to the template")
            return;
        }

        this.sidesCompleted = 0;
        this.findPlayers();
    }

    loadNextLevel() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex < this.levels.length) {
            this.loadLevel(this.currentLevelIndex);
        }
        else {
            console.log("[LEVEL] All levels complete, congrats!!") // TODO: Add completion screen?
        }
    }
};

pc.registerScript(LevelManager, 'levelManager');
LevelManager.attributes.add('sidesCompleted', { type: 'number' })
LevelManager.attributes.add('levelContainer', { type: 'entity' });
LevelManager.attributes.add('levels', { type: 'asset', array: true, assetType: 'template' });