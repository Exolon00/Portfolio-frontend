
function downloadResume() {
  window.open('./src/resume.pdf', '_blank'); 
}

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('a[href^="#section"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', function () {

    const sections = document.querySelectorAll('.section');


    sections.forEach(section => {
      const button = document.querySelector(`.top-bar a[href="#${section.id}"] button`);
      const rect = section.getBoundingClientRect();


      if (rect.top <= 50 && rect.bottom >= 50) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  });


  const form = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');


  submitButton.addEventListener('click', function (event) 
  {
    event.preventDefault(); // Prevent the form from submitting normally


    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(name,email,message)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    }

    fetch('https://portfolio-backend-8kea.onrender.com/', options)
      .then(async (response) => {
        const data = await response.json()
        const newP = document.createElement('p')
        newP.innerHTML = data.msg
        document.getElementById("contactForm").appendChild(newP)
      }).catch(err => {
        console.log(err)
      })
  });
});


