// function to save a recipe to recipeLogs
function saveRecipe(recipeID) {
    let saved = false;
    document.getElementById("save-notice").innerHTML = "";

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