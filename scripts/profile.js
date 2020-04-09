let userid;
let recipeProgress = "Recipes in progress:<br>";
let completedRecipes = "Recipes completed:<br>";

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        if (user != null) {
            userid = user.uid;

            db.collection('users').doc(userid).onSnapshot(
                function (snapshot) {
                    console.log(snapshot.data());
                    document.getElementById('username').innerHTML = snapshot.data().name;
                }
            );

            // loop and check for recipes in progress   
            db.collection('users').doc(userid).collection('recipesLog').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (doc.data().percentCompleted != 100) {
                        ipRecipeName = doc.data().recipeName;
                        ipRecipeProgress = doc.data().percentCompleted;
                        ipRecipeID = doc.id;
                        recipeProgress += "<br>" + ipRecipeName + "<br>Finished " + ipRecipeProgress + "% of the recipe.<br><br>";
                    }
                    if (doc.data().percentCompleted == 100) {
                        ipRecipeName = doc.data().recipeName;
                        ipRecipeID = doc.id;
                        completedRecipes += ipRecipeName + "<br>";
                    }
                });
                // stores recipe id into local storage
                localStorage.setItem('recipeID', ipRecipeID);
                console.log(ipRecipeID);
                document.getElementById('recipesInProgress').innerHTML = (recipeProgress + completedRecipes);
            });

            console.log(userid);
        }
    } else {
        // No user is signed in.
    }
});