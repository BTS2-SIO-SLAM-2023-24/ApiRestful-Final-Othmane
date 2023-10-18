document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API

    // Formulaire pour créer un employé
    const employeForm = document.getElementById('employeForm');
    employeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const dateNaissance = document.getElementById('dateNaissance').value;
        const animalId = document.getElementById('animalId').value;

        createEmploye(nom, prenom, dateNaissance, animalId);
    });

    // Fonction pour créer un employé
    function createEmploye(nom, prenom, dateNaissance, animalId) {
        const data = {
            nom: nom,
            prenom: prenom,
            dateNaissance: dateNaissance,
            animalId: animalId
        };

        fetch(`${API_BASE_URL}/employes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    employeForm.reset(); // Réinitialiser le formulaire
                    fetchEmployes(); // Mettre à jour la liste des employés après la création
                } else {
                    console.error("Erreur lors de la création de l'employé");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la création de l'employé :", error);
            });
    }

    function affecterAnimal(employeId, animalId) {
        fetch(`${API_BASE_URL}/employes/${employeId}/addAnimal/${animalId}`, {
            method: 'POST'
        })
            .then((response) => {
                if (response.ok) {
                    fetchEmployes(); // Mettre à jour la liste des employés après l'affectation de l'animal
                } else {
                    console.error('Erreur lors de l\'affectation de l\'animal à l\'employé');
                }
            })
            .catch((error) => {
                console.error('Erreur lors de l\'affectation de l\'animal à l\'employé :', error);
            });
    }

    function affecterAnimalAUnEmploye(employeId, animalId) {
    fetch(`${API_BASE_URL}/employes/${employeId}/addAnimal/${animalId}`, {
        method: 'POST'
    })
    .then((response) => {
        if (response.ok) {
            fetchEmployes(); // Mettez à jour la liste des employés après l'affectation de l'animal
        } else {
            console.error('Erreur lors de l\'affectation de l\'animal à l\'employé');
        }
    })
    .catch((error) => {
        console.error('Erreur lors de l\'affectation de l\'animal à l\'employé :', error);
    });
}


    // Fonction pour supprimer un employé
    function deleteEmploye(employeId) {
        fetch(`${API_BASE_URL}/employes/${employeId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    fetchEmployes(); // Mettre à jour la liste des employés après la suppression
                } else {
                    console.error("Erreur lors de la suppression de l'employé");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'employé :", error);
            });
    }

    // Fonction pour récupérer la liste des employés depuis l'API
    function fetchEmployes() {
        fetch(`${API_BASE_URL}/employes`)
            .then((response) => response.json())
            .then((data) => {
                const employeList = document.getElementById('employeList');
                employeList.innerHTML = ''; // Effacez la liste précédente

                data.employes.forEach((employe) => {
                    const li = document.createElement('li');
                    li.innerHTML = `Id: ${employe._id}, Nom: ${employe.nom}, Prénom: ${employe.prenom}, Date de Naissance: ${employe.dateNaissance}`;

                    // Bouton pour supprimer l'employé
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Supprimer';
                    deleteButton.addEventListener('click', () => deleteEmploye(employe._id));
                    li.appendChild(deleteButton);

                    employeList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la liste des employés :', error);
            });
    }

function fetchAnimaux() {
        fetch(`${API_BASE_URL}/animaux`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Afficher les données dans la console
                const animalIdSelect = document.getElementById('animalId');
                animalIdSelect.innerHTML = ''; // Effacez la liste précédente

                data.animaux.forEach((animal) => {
                    const option = document.createElement('option');
                    option.value = animal._id;
                    option.textContent = animal.nom;
                    animalIdSelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la liste des animaux :', error);
            });
    }

    // Créer un nouvel élément <select> (liste déroulante)
    const animalIdSelect = document.createElement('select');
    animalIdSelect.id = 'animalId';
    animalIdSelect.name = 'animalId';

    // Remplir la liste déroulante avec les données des animaux
    fetchAnimaux().then((data) => {
        data.animaux.forEach((animal) => {
            const option = document.createElement('option');
            option.value = animal._id;
            option.textContent = animal.nom;
            animalIdSelect.appendChild(option);
        });
    });

    // Mettre à jour la liste des employés avec un bouton "Affecter un animal" pour chaque employé
    function updateEmployeList(data) {
        const employeList = document.getElementById('employeList');
        employeList.innerHTML = ''; // Effacez la liste précédente

        data.employes.forEach((employe) => {
            const li = document.createElement('li');
            li.innerHTML = `Id: ${employe._id}, Nom: ${employe.nom}, Prénom: ${employe.prenom}, Date de Naissance: ${employe.dateNaissance}`;

            // Bouton pour supprimer l'employé
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Supprimer';
            deleteButton.addEventListener('click', () => deleteEmploye(employe._id));
            li.appendChild(deleteButton);

            // Bouton "Affecter un animal"
            const affecterAnimalButton = document.createElement('button');
            affecterAnimalButton.innerText = 'Affecter un animal';
            affecterAnimalButton.addEventListener('click', () => {
                const animalId = prompt('Entrez l\'ID de l\'animal à affecter :');
                if (animalId) {
                    affecterAnimal(employe._id, animalId);
                }
            });
            li.appendChild(affecterAnimalButton);

            employeList.appendChild(li);
        });
    }


   // Appeler fetchEmployes et fetchAnimaux au chargement de la page
   fetchEmployes();
   fetchAnimaux();
});