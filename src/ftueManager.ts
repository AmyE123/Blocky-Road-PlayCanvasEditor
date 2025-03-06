class FTUEManager extends pc.ScriptType {
    tutorialContainer: pc.Entity;
    tutorials: pc.Asset[] = [];
	currentTutorial: pc.Entity | null = null;
    ftueIndex: number = 0;
    ftueComplete: boolean = false;
	ftueFinishedFlag: boolean = false;

    initialize() {
        console.log("[FTUE] Initialized");

        this.spawnTutorial(this.ftueIndex);

        // Listening for inputs to progress the FTUE tutorial
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }

    update() {
        if (this.ftueIndex == 2 && this.ftueComplete && !this.ftueFinishedFlag) {
            console.log("[FTUE] FTUE complete");
            if (this.currentTutorial) {
                this.currentTutorial.destroy();
				this.ftueFinishedFlag = true;
            }
        }
    }

    spawnTutorial(index: number) {
        if (index >= this.tutorials.length) {
			console.log("[FTUE] FTUE complete");
			this.ftueComplete = true;
			return;
        }

        if (this.currentTutorial) {
			this.currentTutorial.destroy();
        }

        const tutorialTemplate = this.tutorials[index].resource as pc.Template;
        this.currentTutorial = tutorialTemplate.instantiate();
        this.tutorialContainer.addChild(this.currentTutorial);
        this.ftueIndex = index;
    }

    private onMouseDown(event: pc.MouseEvent) {
        if (event.button === pc.MOUSEBUTTON_LEFT && this.ftueIndex === 0) {
            this.spawnTutorial(1);
        }
    }

    private onKeyDown(event: pc.KeyboardEvent) {
        if (event.key === pc.KEY_SPACE && this.ftueIndex === 1) {
            this.spawnTutorial(2);
        }
    }
};

pc.registerScript(FTUEManager, 'ftueManager');
FTUEManager.attributes.add('tutorials', { type: 'asset', array: true, assetType: 'template' });
FTUEManager.attributes.add('tutorialContainer', { type: 'entity' });