document.addEventListener('DOMContentLoaded', () => {

    setupGlobalFeatures();
    
    setupSessionFeatures();

    const architectData = {
        "tadao-ando": [
          {
            "titlu": "Biserica Lumii",
            "an": "1989, Ibaraki, Japonia",
            "descriere": "O cruce de lumină tăiată în beton, creând un efect dramatic de iluminare.",
            "imagine": "BisericaLumii.jpg"
          },
          {
            "titlu": "Muzeul de Artă Naoshima",
            "an": "1992, Naoshima, Japonia",
            "descriere": "Integrare subterană în peisaj, cu spații de expoziție iluminate natural.",
            "imagine": "MuzeuldeArtăNaoshima.jpg"
          },
          {
            "titlu": "Casa Azuma",
            "an": "1976, Osaka, Japonia",
            "descriere": "O casă cu curte interioară, explorând relația dintre interior și exterior.",
            "imagine": "CasaAzuma.jpg"
          }
        ],
        "zaha-hadid": [
          {
            "titlu": "Centrul Heydar Aliyev",
            "an": "2012, Baku, Azerbaijan",
            "descriere": "Un centru cultural cu curbe organice care pare să curgă din peisaj.",
            "imagine": "CentrulHeydarAliyev.jpg"
          },
          {
            "titlu": "Opera din Guangzhou",
            "an": "2010, Guangzhou, China",
            "descriere": "Două \"pietre de pe râu\" granitice care creează un dialog dramatic cu apele râului Pearl.",
            "imagine": "OperadinGuangzhou.jpg"
          },
          {
            "titlu": "Centrul Acvatic Londra",
            "an": "2011, Londra, Marea Britanie",
            "descriere": "Centrul acvatic pentru Jocurile Olimpice din 2012, cu un acoperis unduitor.",
            "imagine": "CentrulAcvaticLondra.jpg"
          }
        ],
        "antoni-gaudi": [
          {
            "titlu": "Sagrada Familia",
            "an": "1882-prezent, Barcelona",
            "descriere": "Capodopera sa necrostită, o basilica enormă care combină elemente gotice cu forme organice.",
            "imagine": "SagradaFamilia.avif"
          },
          {
            "titlu": "Casa Batlló",
            "an": "1904-1906, Barcelona",
            "descriere": "Cunoscută ca \"Casa Oaselor\" datorită fațadei sale scheletice și acoperișului de dragon.",
            "imagine": "CasaBatlló.jpg"
          },
          {
            "titlu": "Park Güell",
            "an": "1900-1914, Barcelona",
            "descriere": "Un parc fantastic care combină arhitectura cu peisajul natural, folosind mozaicuri \"trencadís\".",
            "imagine": "ParkGüell.jpg"
          }
        ]
    };


    const architectName = document.body.dataset.architect;
    if (architectName) {
        populateArchitectWorks(architectName, architectData);
    }

    setupPageSpecificFeatures();

});


function setupGlobalFeatures() {
    let themeButton;
    
    if (document.querySelector('.form-wrapper')) {
        themeButton = document.querySelector('.theme-toggle');
    } else {
        themeButton = document.createElement('button');
        themeButton.textContent = 'Toggle Theme';
        themeButton.className = 'theme-toggle Inapoi'; 
        
        if (document.querySelector('header')) {
             document.querySelector('header').appendChild(themeButton);
        } else {
            themeButton.style.padding = '0.75rem 1.875rem';
            themeButton.style.background = '#8a9b68';
            themeButton.style.color = 'white';
            themeButton.style.textDecoration = 'none';
            themeButton.style.borderRadius = '0.25rem';
            themeButton.style.fontSize = '1rem';
            themeButton.style.border = 'none';
            themeButton.style.cursor = 'pointer';
            
            themeButton.style.position = 'absolute';
            themeButton.style.top = '1rem';
            themeButton.style.right = '1rem';
            themeButton.style.zIndex = '100';
             document.body.prepend(themeButton);
        }
    }
    
    themeButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        if (document.documentElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

    const footer = document.querySelector('footer div');
    if (footer) {
        const clockDiv = document.createElement('div');
        clockDiv.id = 'live-clock';
        clockDiv.style.padding = '0.75rem';
        clockDiv.style.minWidth = '100px';
        footer.appendChild(clockDiv);

        setInterval(() => {
            const now = new Date();
            clockDiv.textContent = now.toLocaleTimeString('ro-RO');
        }, 1000);
    }
}

function setupSessionFeatures() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const header = document.querySelector('header');

    if (loggedInUser && header) {
        const logoutButton = document.createElement('button');
        logoutButton.textContent = `Logout (${loggedInUser})`;
        logoutButton.className = 'logout-btn Inapoi'; 
        
        logoutButton.style.position = 'absolute';
        logoutButton.style.top = '1rem';
        logoutButton.style.left = '1rem';
        logoutButton.style.zIndex = '100';
        logoutButton.style.backgroundColor = '#a67f78';

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html'; 
        });
        
        header.appendChild(logoutButton);
    }
}

function populateArchitectWorks(architectName, architectData) {
    const container = document.querySelector('.Lista-Creatie');
    if (!container) return; 

    const works = architectData[architectName];
    if (!works) {
        container.innerHTML = '<p>Nu s-au găsit lucrări pentru acest arhitect.</p>';
        return;
    }

    container.innerHTML = ''; 
    works.forEach(work => {
        const cardElement = document.createElement('div');
        cardElement.className = 'Creatia';

        const title = document.createElement('h3');
        title.className = 'Titlu-Creatie';
        title.textContent = work.titlu; 

        const year = document.createElement('div');
        year.className = 'An-Creatie';
        year.textContent = work.an; 

        const description = document.createElement('p');
        description.textContent = work.descriere; 

        const pozeDiv = document.createElement('div');
        pozeDiv.className = 'Poze';

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imagine;
        img.alt = work.titlu;
        img.className = 'Loc-Poza';
        
        cardElement.addEventListener('click', (e) => {
            console.log('--- CARD CLICK (JS) ---');
            console.log('currentTarget (elementul .Creatia):', e.currentTarget);
            console.log('target (elementul exact lovit):', e.target);
        });

        figure.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                e.stopPropagation();
                alert('Ai dat click doar pe imagine. Propagarea a fost oprită.');
            }
        });

        figure.appendChild(img);
        pozeDiv.appendChild(figure);
        
        cardElement.appendChild(title);
        cardElement.appendChild(year);
        cardElement.appendChild(description);
        cardElement.appendChild(pozeDiv);
        
        container.appendChild(cardElement);
    });
}


function setupPageSpecificFeatures() {
    const headerTitle = document.querySelector('header h1');
    
    if (headerTitle) {
        const originalColor = getComputedStyle(headerTitle).color;
        headerTitle.addEventListener('mouseenter', () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            headerTitle.style.color = `rgb(${r},${g},${b})`;
        });
        headerTitle.addEventListener('mouseleave', () => {
            setTimeout(() => {
                headerTitle.style.color = originalColor;
            }, 500);
        });
    }
    
    document.querySelectorAll('.Poze > figure').forEach(figure => {
        if (!figure.closest('.Lista-Creatie')) {
            const cardImage = figure.querySelector('.Loc-Poza');
            if (cardImage) {
                cardImage.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    alert('Ai dat click doar pe imagine (din .Poze). Propagarea a fost oprită.');
                });
            }
        }
    });

    const commentForm = document.getElementById('comment-form'); 
    const showFormBtn = document.getElementById('show-form-btn');

    if (commentForm && showFormBtn) {
        
        const emailInput = document.getElementById('user-email');
        const loggedInUserEmail = localStorage.getItem('loggedInUser');

        if (loggedInUserEmail && emailInput) {
            emailInput.value = loggedInUserEmail;
            emailInput.readOnly = true;
        }

        const commentsContainer = document.getElementById('comments-container');
        const ratingValue = document.getElementById('rating-value');
        const ratingInput = document.getElementById('user-rating');

        showFormBtn.addEventListener('click', () => {
            commentForm.style.display = 'block';
            showFormBtn.style.display = 'none';
        });

        ratingInput.addEventListener('input', (e) => {
            ratingValue.textContent = e.target.value;
        });

        loadComments();

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const commentInput = document.getElementById('user-comment');

            if (commentInput.value.trim() === '') {
                 alert('Vă rugăm lăsați un comentariu.');
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

            if (loggedInUserEmail && emailInput) {
                emailInput.value = loggedInUserEmail;
            }
        });
    }

    function saveComment(comment) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.forEach(comment => addCommentToDOM(comment));
    }

    function addCommentToDOM(comment) {
        const commentsContainer = document.getElementById('comments-container');
        if (!commentsContainer) return; 

        const currentUserEmail = localStorage.getItem('loggedInUser');

        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        
        const emailEl = document.createElement('strong');
        emailEl.textContent = comment.email;
        
        const dateEl = document.createElement('span');
        dateEl.textContent = ` (Rating: ${comment.rating}/10) - ${new Date(comment.date).toLocaleString('ro-RO')}`;
        
        const commentText = document.createElement('p');
        commentText.textContent = comment.comment;
        
        commentElement.appendChild(emailEl);
        commentElement.appendChild(dateEl);
        commentElement.appendChild(commentText);

        if (currentUserEmail === 'admin@gmail.com') {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Șterge';
            deleteButton.addEventListener('click', () => {
                commentElement.remove(); 
                removeCommentFromStorage(comment); 
            });
            commentElement.appendChild(deleteButton);
        }
        
        commentsContainer.prepend(commentElement); 
    }
    
    function removeCommentFromStorage(commentToRemove) {
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments = comments.filter(c => c.date !== commentToRemove.date);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
}