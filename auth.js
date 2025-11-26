const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) 
{
    alert('Trebuie să fii autentificat pentru a accesa această pagină.');    
    window.location.href = 'login.html';
}