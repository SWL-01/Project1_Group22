// Get recipe value from firebase data collection
let userID;

// performs personalization if a user is logged in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // if user is signed in, do...
        let user = firebase.auth().currentUser;

        if (user != null) {
            userID = user.uid;
            update(userID);
        }
    } else {
        // if no user is signed in.
    }
});
function update(uID) {
    db.collection('users').doc(uID).onSnapshot(function (snapshot2) {
        snapshot2.data().recipesCompleted += 25;
    });
}
// Save recipe log
function saveRecipe(recipeID) {
    let saved = false;

    // check if recipeID exists in users recipesLog
    db.collection('users').doc(userID).collection('recipesLog').get().then(function (querySnapshot) {

        // loop and check for existing recipeID
        querySnapshot.forEach(function (doc) {
            console.log(doc.id);
            if (doc.id == recipeID) {
                window.alert("This recipe is already saved.");
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
                    window.alert("This recipe has been saved.");
                }
            );
        }
    });
}

// Complete message appear if user complete recipe
function complete(recipeID) {
    let check = false;

    db.collection('users').doc(userID).collection('recipeLog').get().then(function (querySnapshot2) {
        querySnapshot2.forEach(function (doc) {
            console.log(doc.id);
            if (doc.id == recipeID) {
                window.alert("This recipe is already completed.");
                check = true;
                console.log("Completiton is now " + check);
            }
        });


    }).then(function () {
        if (!check) {
            db.collection('recipes').doc(recipeID).onSnapshot(
                function (snapshot) {
                    console.log(snapshot.data());

                    db.collection('users').doc(userID)
                        .collection('recipesLog').doc(recipeID).set({
                            percentCompleted: 100,
                            recipeName: snapshot.data().name
                        });
                    console.log(check);
                    window.alert("Congratulation! You complete this recipe!");
                }
            );
        }
    });
}