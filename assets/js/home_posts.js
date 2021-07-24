// Method to submit the form data for new post using ajax

{
    // console.log("JS is running")
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        //to prevent the form from submitting it automatically
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url:'/posts/create',
                // to convert the data into JSON format
                data: newPostForm.serialize(),
                success: function(data){
                    // find the data
                    let newPost = newPostDom(data.data.post);
                    // populate it here
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create post in DOM

    let newPostDom = function(post){
        return $(`<li id="posts-${post._id}">
                <p>
            
               
                    <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                    </small>
                <!-- This content will come from form post -->
                ${post.content}
            
                <br>
                <small>
                <!--<%= post.user.name%>  -->
                     
                    ${post.user.name}
                </small>
            
                </p>
            
                <!-- container for comments -->
                <div class="post-comments">
                
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content"  placeholder="Type here to add comment ..."  >
                        <!-- ID of the post in which the comment is need to be added  -->
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Post Comment">
                
                    
                    <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                    </div>
            
                </div>
            </li>`)
    }

    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
 
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}