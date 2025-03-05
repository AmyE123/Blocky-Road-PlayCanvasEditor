class Player extends pc.ScriptType {
    isTop: boolean;
    hasCompletedLevel: boolean;
    completionFlag: boolean = false;
    levelManager: pc.Entity;
    isActive: boolean;

    initialize() {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);

        if (this.isTop) {
            this.isActive = true;
        }

        this.findLevelManager();
    }

    update() {
        if (this.hasCompletedLevel && !this.completionFlag) {
            if (!this.levelManager) { 
                console.error("[PLAYER] LevelManager not found.");
                this.findLevelManager();
                return;
            }
            var levelManagerScript = this.levelManager.script?.get('levelManager') as LevelManager | undefined;

            if (levelManagerScript) {
                levelManagerScript.sidesCompleted++;
                this.completionFlag = true;
            }
        }
    }

    onMouseDown(event: pc.MouseEvent) {
        if (event.button == pc.MOUSEBUTTON_LEFT) {
            if (this.isActive) {
                if (this.isTop) {
                    this.entity.translate(0, 0, -1);  // TODO: Make this a constant somewhere. No magic numbers! 
                }
                else {
                    this.entity.translate(0, 0, 1);  // TODO: Make this a constant somewhere. No magic numbers! 
                }
            }
               
        }       
    }

    destroy() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }

    findLevelManager() {
        if (!this.levelManager) {
            var levelManagerEntity = this.app.root.findByTag('levelManager')[0] as pc.Entity | undefined;

            if (levelManagerEntity) {
                this.levelManager = levelManagerEntity;
                console.log("[PLAYER] Found LevelManager:", this.levelManager.name);
            } else {
                console.error("[PLAYER] LevelManager not found!");
            }
        }
    }
};

pc.registerScript(Player, 'player');
Player.attributes.add('isTop', { type: 'boolean' });
Player.attributes.add('hasCompletedLevel', { type: 'boolean' });
Player.attributes.add('incrementedSidesCompleted', { type: 'boolean' });
Player.attributes.add('levelManager', { type: 'entity' });