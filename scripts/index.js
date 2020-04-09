/**
 * UPDATED APR 4, 2020. 3:42pm.
 * javascript for index.html.
 */

let userID;

// performs personalization if a user is logged in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // if user is signed in, do...
        let user = firebase.auth().currentUser;

        if (user != null) {
            userID = user.uid;

            // personalization.
            personalizeJumbo(userID);

            // personalization for a recipe in progress.
            personalizeRecipe(userID);
        }
    } else {
        // if no user is signed in.
    }
});

// function to personalize the jumbo element.
// greeting to current user.
function personalizeJumbo(uID) {
    db.collection('users').doc(uID).onSnapshot(
        function (snapshot) {
            document.getElementById('jumbo-h').innerHTML = "Hello " + snapshot.data().name + ",";
            document.getElementById('jumbo-p').innerHTML = "You have completed " + snapshot.data().recipesCompleted + " recipes. <br>";
            document.getElementById('jumbo-btn').innerHTML = "Continue!";
            document.getElementById('jumbo-btn').href = "recipe-" + snapeshot.data().recipeName // this goes to a specific recipe.
        }
    );
}

// function to personalize the jumbo element.
// continue a recipe that is in progress.
function personalizeRecipe(uID) {
    db.collection('users').doc(uID).collection('recipesLog').get().then(function (querySnapshot) {
        let ipRecipeName;
        let ipRecipeProgress;
        let ipRecipeID;

        // loop and check for recipes in progress
        querySnapshot.forEach(function (doc) {
            if (doc.data().percentCompleted < 100) {
                ipRecipeName = doc.data().recipeName;
                ipRecipeProgress = doc.data().percentCompleted;
                ipRecipeID = doc.id;
            }
        });

        // stores recipe id into local storage for later use.
        localStorage.setItem('recipeID', ipRecipeID);

        // personalization.
        if (ipRecipeID == undefined) {
            document.getElementById('jumbo-btn').innerHTML = "Start!";
            document.getElementById('jumbo-btn').href = "recipes.html";
        } else {
            document.getElementById('jumbo-p').innerHTML += "You have completed " + ipRecipeProgress + "% of the " + ipRecipeName + " recipe.";
            document.getElementById('jumbo-btn').href = "recipe-" + ipRecipeName + ".html";
        }
    });
}

// function to save a recipe to recipeLogs
function saveRecipe(recipeID) {
    let saved = false;
    document.getElementById("save-notice").innerHTML = "";

    // check if recipeID exists in users recipesLog
    db.collection('users').doc(userID).collection('recipesLog').get().then(function (querySnapshot) {

        // loop and check for existing recipeID
        querySnapshot.forEach(function (doc) {
            if (doc.id == recipeID) {
                document.getElementById("save-notice").innerHTML = "This recipe is already saved.";
                saved = true;
            }
        });
    }).then(function () {
        if (!saved) {

            // go to recipe doc in "recipe" collection
            db.collection('recipes').doc(recipeID).onSnapshot(
                function (snapshot) {
                    db.collection('users').doc(userID)
                        .collection('recipesLog').doc(recipeID).set({
                            percentCompleted: 0,
                            recipeName: snapshot.data().name
                        });
                    document.getElementById("save-notice").innerHTML = "This recipe has been saved.";
                }
            );
        }
    });
}