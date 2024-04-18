class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin your adventure!");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        if (key == "Mariner"){
            this.engine.storyData.Axe.push("Axe");
            //The player now has an axe they can use.
        }
        if (key == "Chopping Lilyut Hills" && this.engine.storyData.Axe.length == 1){
            
            var TreeDict = {"Text": "Chop Tree", "Target": "Tree Chopping"};
            
            this.engine.storyData.Axe.push("Log");
            
            //this.engine.storyData.Locations["Tree Chopping"].Choices.Push(TreeDict);
            key = "Tree Chopping";
            let locationData = this.engine.storyData.Locations[key];
            this.engine.show(locationData.Body);
            //this.engine.show("hello");
            if(locationData.Choices.length >= 1) { // TODO: check if the location has any Choices
                for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            } else {
                this.engine.addChoice("The end.")
            }
        }
        //Unlock a new action in this portion here.
        if(key == "Dewstone Plains" && this.engine.storyData.Axe.length == 2){
            var Dict = {"Text": "Fix Mariners Boat!", "Target": "Diamond Shores"};
            
            key = "New Dewstone Plains";
            let locationData = this.engine.storyData.Locations[key];
            this.engine.show(locationData.Body);
            //this.engine.show("hello");
            if(locationData.Choices.length >= 1) { // TODO: check if the location has any Choices
                for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            } else {
                this.engine.addChoice("The end.")
            }
        }
        if(key == "Diamond Shores"){
            this.engine.addChoice("The end.")
        }
        if(locationData.Choices.length >= 1) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');