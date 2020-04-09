// percentage to represent completion.
const MAX_PERCENT = 100;

let userid;
let recipeProgress = "Recipes in progress:<br>";
let completedRecipes = "<br>Recipes completed:<br><br>";

// performs personalization if a user is logged in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        user = firebase.auth().currentUser;
        if (user != null) {
            userid = user.uid;

            db.collection('users').doc(userid).onSnapshot(
                function (snapshot) {
                    console.log(snapshot.data());
                    document.getElementById('username').innerHTML = snapshot.data().name;
                }
            );

            // loop and check for recipes progress   
            db.collection('users').doc(userid).collection('recipesLog').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // If the recipe is not 100% done add its name and percent completed to a string
                    if (doc.data().percentCompleted != MAX_PERCENT) {
                        ipRecipeName = doc.data().recipeName;
                        ipRecipeProgress = doc.data().percentCompleted;
                        ipRecipeID = doc.id;
                        recipeProgress += "<br>" + ipRecipeName + "<br>Finished " + ipRecipeProgress + "% of the recipe.<br>";
                    }
                    // If the recipe is 100% done add its name to a string.
                    if (doc.data().percentCompleted == MAX_PERCENT) {
                        ipRecipeName = doc.data().recipeName;
                        ipRecipeID = doc.id;
                        completedRecipes += ipRecipeName + "<br>";
                        console.log(completedRecipes);
                    }
                });
                // Replaces the empty space with recipe progress and a list of completed recipes.
                document.getElementById('recipesInProgress').innerHTML = recipeProgress + completedRecipes;
            });
        }
    } else {
        // No user is signed in.
    }
});
