document.addEventListener('DOMContentLoaded', () => {

    let themeButton; 
    if (document.querySelector('.form-wrapper')) 
	{
        themeButton = document.querySelector('.theme-toggle');
    } 
	else 
	{
        themeButton = document.createElement('button');
        themeButton.textContent = 'Toggle Theme';
        themeButton.className = 'theme-toggle Inapoi';
        
        if (document.querySelector('header')) 
		{
             document.querySelector('header').appendChild(themeButton);
        }
		else 
		{
            themeButton.style.position = 'absolute';
            themeButton.style.top = '1rem';
            themeButton.style.right = '1rem';
            themeButton.style.zIndex = '100';
             document.body.prepend(themeButton);
        }
    }

    themeButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        if (document.documentElement.classList.contains('dark-mode'))
		{
            localStorage.setItem('theme', 'dark');
        }
		else 
		{
            localStorage.removeItem('theme');
        }
    });

    const footer = document.querySelector('footer div');
    if (footer) 
	{
        const clockDiv = document.createElement('div');
        clockDiv.id = 'live-clock';
        clockDiv.style.padding = '0.75rem';
        clockDiv.style.minWidth = '100px';
        footer.appendChild(clockDiv);
        setInterval(() => 
		{
            const now = new Date();
            clockDiv.textContent = now.toLocaleTimeString('ro-RO');
        }, 1000);
    }

    const contentCards = document.querySelectorAll('.Creatia');
    const headerTitle = document.querySelector('header h1');
  
    if (headerTitle) 
	{
        const originalColor = getComputedStyle(headerTitle).color;
        headerTitle.addEventListener('mouseenter', () => 
		{
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            headerTitle.style.color = `rgb(${r},${g},${b})`;
        });

        headerTitle.addEventListener('mouseleave', () => 
		{
            setTimeout(() => {
                headerTitle.style.color = originalColor;
            }, 500);
        });
    }
    
    if (contentCards.length > 0) 
	{
        contentCards.forEach(card =>
		{
            card.addEventListener('click', (e) => 
			{
                console.log('--- CARD CLICK ---');
                console.log('currentTarget (elementul cu event listener):', e.currentTarget);
                console.log('target (elementul pe care s-a dat click):', e.target);
            });

            const cardImage = card.querySelector('.Loc-Poza');
            if (cardImage)
			{
                cardImage.addEventListener('click', (e) => {
                    e.stopPropagation();
                    alert('Ai dat click doar pe imagine. Propagarea a fost oprită.');
                });
            }
        });
    }

    const commentForm = document.getElementById('comment-form'); 
    const showFormBtn = document.getElementById('show-form-btn');

    if (commentForm && showFormBtn) 
	{
        const commentsContainer = document.getElementById('comments-container');
        const ratingValue = document.getElementById('rating-value');
        const ratingInput = document.getElementById('user-rating');

        showFormBtn.addEventListener('click', () => 
		{
            commentForm.style.display = 'block';
            showFormBtn.style.display = 'none';
        });

        ratingInput.addEventListener('input', (e) => 
		{
            ratingValue.textContent = e.target.value;
        });

        loadComments();

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const emailInput = document.getElementById('user-email');
            const commentInput = document.getElementById('user-comment');

            if (emailInput.value === '' || commentInput.value === '') {
                 alert('Vă rugăm completați toate câmpurile.');
                 return;
            }

            const newComment = {
                email: emailInput.value,
                comment: commentInput.value.trim(),
                rating: ratingInput.value,
                date: new Date().toISOString()
            };

            saveComment(newComment);
            addCommentToDOM(newComment);
            commentForm.reset();
            ratingValue.textContent = '5';
        });
    }

    function saveComment(comment) 
	{
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() 
	{
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.forEach(comment => addCommentToDOM(comment));
    }

    function addCommentToDOM(comment) 
	{
        const commentsContainer = document.getElementById('comments-container');
        if (!commentsContainer) return;

        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        
        const emailEl = document.createElement('strong');
        emailEl.textContent = comment.email;
        
        const dateEl = document.createElement('span');
        dateEl.textContent = ` (Rating: ${comment.rating}/10) - ${new Date(comment.date).toLocaleString('ro-RO')}`;
        
        const commentText = document.createElement('p');
        commentText.textContent = comment.comment;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Șterge';
        deleteButton.addEventListener('click', () => {
            commentElement.remove();
            removeCommentFromStorage(comment);
        });
        
        commentElement.appendChild(emailEl);
        commentElement.appendChild(dateEl);
        commentElement.appendChild(commentText);
        commentElement.appendChild(deleteButton);
        commentsContainer.prepend(commentElement);
    }
    
    function removeCommentFromStorage(commentToRemove) 
	{
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments = comments.filter(c => c.date !== commentToRemove.date);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
});