class LevelManager extends pc.ScriptType {
    sidesCompleted: number = 0;
    levelContainer: pc.Entity;
    isTop: boolean = true;
    playerTop: pc.Entity;
    playerBottom: pc.Entity;

    initialize() {     
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
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

            var topPlayerScript = this.playerTop.script?.get('player') as Player | undefined;
            var bottomPlayerScript = this.playerBottom.script?.get('player') as Player | undefined;

            if (topPlayerScript && bottomPlayerScript) {
                topPlayerScript.isActive = !topPlayerScript.isActive;
                bottomPlayerScript.isActive = !bottomPlayerScript.isActive;
            }
        }
    }
};

pc.registerScript(LevelManager, 'levelManager');
LevelManager.attributes.add('sidesCompleted', { type: 'number' })
LevelManager.attributes.add('levelContainer', { type: 'entity' });
LevelManager.attributes.add('playerTop', { type: 'entity' });
LevelManager.attributes.add('playerBottom', { type: 'entity' });