let userID;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // if user is signed in, do...
        let user = firebase.auth().currentUser;

        if (user != null) {
            userID = user.uid;
        }
    } else {
        // if no user is signed in.
    }
});

// function to save a recipe to recipeLogs
function saveRecipe(recipeID) {
    let saved = false;
    document.getElementById("save-notice-r").innerHTML = "";

    // check if recipeID exists in users recipesLog
    db.collection('users').doc(userID).collection('recipesLog').get().then(function (querySnapshot) {
        // loop and check for existing recipeID
        querySnapshot.forEach(function (doc) {
            if (doc.id == recipeID) {
                document.getElementById("save-notice-r").innerHTML = "This recipe is already saved.";
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
                        document.getElementById("save-notice-r").innerHTML = "This recipe has been saved.";
                }
            );
        }
    });
}