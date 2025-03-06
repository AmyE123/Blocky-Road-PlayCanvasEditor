class Player extends pc.ScriptType {
    isTop: boolean;
    hasCompletedLevel: boolean;
    completionFlag: boolean = false;
    levelManager: pc.Entity;
    isActive: boolean;
    ftueManager: pc.Entity;
    ftueFlag: boolean;

    initialize() {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);

        if (this.isTop) {
            this.isActive = true;
        }

        this.findLevelManager();

        if (!this.ftueFlag) {
            this.findFTUEManager();
        }    
    }

    update() {
        if (this.hasCompletedLevel && !this.completionFlag) {
            if (!this.levelManager) { 
                console.error("[PLAYER] LevelManager not found.");
                this.findLevelManager();
                return;
            }

            // TODO: Cleanup repetitive code!
            // There HAS to be a better way to do this ? repetitive code between level manager and ftue manager
            if (!this.ftueManager && !this.ftueFlag) {
                console.error("[PLAYER] FTUEManager not found.");
                this.findFTUEManager();
                return;
            }

            var levelManagerScript = this.levelManager.script?.get('levelManager') as LevelManager | undefined;
            var ftueManagerScript = this.ftueManager.script?.get('ftueManager') as FTUEManager | undefined;

            if (levelManagerScript) {
                levelManagerScript.sidesCompleted++;                              
                this.completionFlag = true;

                if (ftueManagerScript && !this.ftueFlag) {
                    ftueManagerScript.ftueComplete = true;
                    this.ftueFlag = true;
                }
            }
        }
    }

    onMouseDown(event: pc.MouseEvent) {
        if (event.button == pc.MOUSEBUTTON_LEFT) {
            this.movePlayer();
        }       
    }

    private checkValidMovement(): boolean {
        if (!this.isActive) {
            return false;
        }

        let moveDirection = this.isTop ? new pc.Vec3(0, 0, -1) : new pc.Vec3(0, 0, 1);
        let newPosition = this.entity.getPosition().clone().add(moveDirection);

        if (!this.app.systems || !this.app.systems.rigidbody) {
            console.error("[PLAYER] Rigidbody not found!");
            return false;
        }

        let result = this.app.systems.rigidbody.raycastFirst(this.entity.getPosition(), newPosition);

        return result === null;       
    }

    private movePlayer() {
        if (!this.checkValidMovement()) {
            return; // Collision detected, do not move
        }

        let moveDirection = this.isTop ? new pc.Vec3(0, 0, -1) : new pc.Vec3(0, 0, 1);
        let newPosition = this.entity.getPosition().clone().add(moveDirection);

        if (this.entity.rigidbody) {
            this.entity.rigidbody.teleport(newPosition);
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

    // TODO: Cleanup repetitive code!
    // There HAS to be a better way to do this ? repetitive code between level manager and ftue manager
    findFTUEManager() {
        if (!this.ftueManager && !this.ftueFlag) {
            var ftueManagerEntity = this.app.root.findByTag('ftueManager')[0] as pc.Entity | undefined;
            if (ftueManagerEntity) {
                this.ftueManager = ftueManagerEntity;
                console.log("[PLAYER] Found FTUEManager:", this.ftueManager.name);
            } else {
                console.error("[PLAYER] FTUEManager not found!");
            }
        }
    }
};

pc.registerScript(Player, 'player');
Player.attributes.add('isTop', { type: 'boolean' });
Player.attributes.add('hasCompletedLevel', { type: 'boolean' });
Player.attributes.add('incrementedSidesCompleted', { type: 'boolean' });
Player.attributes.add('levelManager', { type: 'entity' });
Player.attributes.add('ftueManager', { type: 'entity' });