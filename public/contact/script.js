document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const fields = form.querySelectorAll('input, textarea');
    let valid = true;

    // Supprimer les classes d'erreur précédentes
    fields.forEach(field => {
        field.classList.remove('invalid');
    });

    // Vérifier les champs requis
    fields.forEach(field => {
        if (!field.value.trim() && field.required) {
            valid = false;
            // Ajouter la classe 'invalid' à ce champ
            field.classList.add('invalid');
        }
    });

    if (valid) {
        // Si tous les champs sont valides, envoyer les données
        const formData = new FormData(form);
        const data = {
            prenom: formData.get('prenom'),
            nom: formData.get('nom'),
            email: formData.get('email'),
            tel: formData.get('tel'),
            message: formData.get('message')
        };

        fetch('http://192.168.11.100:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.textContent = data.message;

            if (data.message === 'Données enregistrées avec succès') {
                form.reset();

                // Cacher le formulaire avec la classe
                form.classList.add('hidden');
                form.classList.remove('visible');

                // Afficher le message de confirmation en douceur
                responseMessage.style.visibility = 'visible';  // S'assurer qu'il devient visible
                responseMessage.style.opacity = '1';  // Mettre l'opacité à 1
                responseMessage.textContent = 'Merci pour votre soumission, nous vous contacterons bientôt !';

                // Optionnel : cacher le message après quelques secondes
                setTimeout(() => {
                    responseMessage.style.opacity = '0';
                    setTimeout(() => {
                        responseMessage.style.visibility = 'hidden';  // Cacher le message après la transition
                    }, 500);
                }, 5000);  // Message visible pendant 5 secondes
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
            document.getElementById('responseMessage').textContent = 'Une erreur est survenue. Veuillez réessayer.';
        });
    } else {
        document.getElementById('responseMessage').textContent = "Veuillez remplir tous les champs obligatoires.";
    }
});

document.getElementById('tel').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre
    value = value.slice(0, 10); // Limiter à 10 chiffres

    // Ajouter un espace tous les 2 caractères
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 2 === 0) {
            formattedValue += ' '; // Ajouter un espace tous les deux caractères
        }
        formattedValue += value[i];
    }

    // Mettre à jour le champ de saisie
    e.target.value = formattedValue;
});