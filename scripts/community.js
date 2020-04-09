/**
 * UPDATED APR 4, 2020. 6:11PM.
 * javascript for community.html.
 */

let userid;
let username;
let time;

// performs personalization if a user is logged in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // if user is signed in, do...
        let user = firebase.auth().currentUser;
        if (user != null) {
            userid = user.uid;

            // personalization.
            db.collection('users').doc(userid).onSnapshot(
                function (snapshot) {
                    document.getElementById('jumbo-h').innerHTML = "Hello " + snapshot.data().name + ", what would you like to do?";
                    username = snapshot.data().name;
                }
            );
        }
    } else {
        // if no user is signed in.
    }
});

// function to load dropdown items.
function loadDropdown() {
    db.collection('recipes').get().then(function (querySnapshot) {

        // loop and check for existing recipeID
        querySnapshot.forEach(function (doc) {
            let recipeString = '"' + doc.data().name + '"';

            document.getElementById("dropdown-items").innerHTML +=
                "<a class='dropdown-item' onclick='loadComments(" + recipeString + ")' href='#'>" + doc.data().name + "</a>";

            document.getElementById("post-cmt-recipes").innerHTML +=
                "<option>" + doc.data().name + "</option>";
        });
    })
}

// function to load a recipe's comments.
function loadComments(recipeName) {
    document.getElementById("comment-table").innerHTML = "";
    document.getElementById("current-recipe-view").innerHTML = recipeName;

    db.collection('comments').doc(recipeName).collection('comments').onSnapshot(function(snapshot) {

        // real time comment updates
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {

                // adds all comments relating to recipeID.
                document.getElementById("comment-table").innerHTML +=
                    "<tr> <td scope='row'>" +
                    change.doc.data().name +
                    "</td> <td colspan='2'>" +
                    change.doc.data().posted.toDate() +
                    "</td><td>" +
                    change.doc.data().comment +
                    "</td></tr>";
            }
        });
    });
}

// function to show post modal.
function showModal() {
    time = new Date();

    // load post modal.
    db.collection('users').doc(userid).onSnapshot(
        function (snapshot) {
            document.getElementById('post-cmt-name').innerHTML = "Your name: " + snapshot.data().name;
            document.getElementById('post-cmt-time').innerHTML = "Time posted: " + time;
        }
    );
}

// function to post a comment.
function postComment() {
    let recipeName = document.getElementById("post-cmt-recipes").value;
    let commentText = document.getElementById("post-cmt-comment").value;

    // creates comment in database
    db.collection('comments').doc(recipeName)
        .collection('comments').add({
            name: username,
            comment: commentText,
            posted: firebase.firestore.Timestamp.fromDate(time)
        })
        .then(function(docRef){
            console.log("successful post. " + docRef.id)
        });
}

// function calls.
loadDropdown();
document.getElementById("post-btn").onclick = showModal;
document.getElementById("post-cmt-btn").onclick = postComment;