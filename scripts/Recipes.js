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

    // check if recipeID exists in users recipesLog
    db.collection('users').doc(userID).collection('recipesLog').get().then(function (querySnapshot) {

        // loop and check for existing recipeID
        querySnapshot.forEach(function (doc) {
            console.log(doc.id);
            if (doc.id == recipeID) {
                document.getElementById("save-notice").innerHTML = "This recipe is already saved.";
                saved = true;
                console.log("saved is now " + saved);
            }
        });
    }).then(function () {
        if (!saved) {

            // go to recipe doc in "recipe" collection
            db.collection('recipes').doc(recipeID).onSnapshot(
                function (snapshot) {
                    console.log(snapshot.data());
                    console.log(snapshot.data().name);
                    db.collection('users').doc(userID)
                        .collection('recipesLog').doc(recipeID).set({
                            percentCompleted: 0,
                            recipeName: snapshot.data().name
                        });
                    console.log(saved);
                    document.getElementById("save-notice").innerHTML = "This recipe has been saved.";
                }
            );
        }
    });
}