var app = firebase.initializeApp(firebaseConfig);

var db = app.firestore();

loadComments();

function deleteComment(docId) {
    db.collection('comments')
        .doc(docId)
        .delete()
        .then(function() {
            console.log('Document successfully deleted!');
            loadComments();
        })
        .catch(function(error) {
            console.error('Error removing document: ', error);
        });
}

function loadComments() {
    db.collection('comments')
        .get()
        .then(querySnapshot => {
            var commentsHTML = [];
            querySnapshot.forEach(doc => {
                var documentData = doc.data();
                var commentHTML = `<div class="comment">
				
				<div class="dialogbox">
				<div class="body">
				  <span class="tip tip-left"></span>
				  <div class="message">
					<span>${documentData.comment}</span>
					<button type="button" onclick="deleteComment('${doc.id}')" class="close"> 
				<span>×</span> 
				</button>  
				  </div>
				</div>
			  </div>
				    
                </div>`;
                commentsHTML.push(commentHTML);
            });

            document.getElementById('comments').innerHTML = commentsHTML.join(' ');
        });
}

var commentForm = document.getElementById('commentForm');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event);
    var commentText = event.target.elements.commentText.value;
    if (commentText == '') {
        return;
    }
    db.collection('comments')
        .add({
            comment: commentText
        })
        .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
            loadComments();
        })
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
});