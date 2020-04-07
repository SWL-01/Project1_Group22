// Get recipe value from firebase data collection
let recipename;
let userID;
db.collection('recipes').doc("0").onSnapshot(
    function (snapshot) {
        document.getElementById('recipename').innerHTML = snapshot.data().name;
        recipename = snapshot.data().name;
    }
);

// Complete message appear if user complete recipe
function complete() {
    db.collection('recipes').doc("0").onSnapshot(
        function (snapshot2) {
            snapshot2.data().reciepeCompleted += 1;
            console.log(snapshot2.data());
            console.log(snapshot2.data().name);
            console.log(snapshot2.data().reciepeCompleted);
            db.collection('users').doc(userID)
                .collection('recipesLog').doc(recipeID).set({
                    percentCompleted: snapshot2.data().reciepeCompleted,
                    recipeName: snapshot2.data().name
                });
            console.log(complete);
            document.getElementById("complete-notice").innerHTML = "You complete this recipe!";
        }
    );
}