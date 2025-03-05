class HelloWorld extends pc.ScriptType {

    initialize() {
        console.log("Hello World!! Testy test");
    }
};

pc.registerScript(HelloWorld, 'helloWorld');
