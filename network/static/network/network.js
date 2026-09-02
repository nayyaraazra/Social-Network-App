document.addEventListener('DOMContentLoaded', function() {
    
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const postId = card.dataset.postId;
            const contentDiv = card.querySelector('.post-content');
            const originalContent = contentDiv.innerText;
            
            this.style.display = 'none';
            
            contentDiv.innerHTML = `
                <textarea class="form-control mb-2" id="edit-textarea-${postId}">${originalContent}</textarea>
                <button class="btn btn-sm btn-success save-btn" data-post-id="${postId}">Save</button>
                <button class="btn btn-sm btn-secondary cancel-btn" data-post-id="${postId}">Cancel</button>
            `;
            
            contentDiv.querySelector('.cancel-btn').addEventListener('click', function() {
                contentDiv.innerText = originalContent;
                btn.style.display = 'inline-block';
            });
            
            contentDiv.querySelector('.save-btn').addEventListener('click', function() {
                const newContent = contentDiv.querySelector('textarea').value;
                
                fetch(`/edit_post/${postId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        content: newContent
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong.');
                    }
                })
                .then(result => {
                    contentDiv.innerText = newContent;
                    btn.style.display = 'inline-block';
                })
                .catch(error => {
                    alert(error);
                    contentDiv.innerText = originalContent;
                    btn.style.display = 'inline-block';
                });
            });
        });
    });

    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const postId = card.dataset.postId;
            const likeCountSpan = this.querySelector('.like-count');
            
            fetch(`/like_post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong.');
                }
            })
            .then(result => {
                likeCountSpan.innerText = result.likes;
                const icon = this.querySelector('i');
                if (result.liked) {
                    this.classList.add('liked');
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid', 'text-danger');
                } else {
                    this.classList.remove('liked');
                    icon.classList.remove('fa-solid', 'text-danger');
                    icon.classList.add('fa-regular');
                }
            })
            .catch(error => {
                console.log(error);
            });
        });
    });
});

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
