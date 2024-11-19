let currentStep = 1;

        function updateStep() {
            const steps = document.querySelectorAll('.step');
            steps.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
            });
        }

        function nextStep() {
            const steps = document.querySelectorAll('.step');
            const currentInput = steps[currentStep - 1].querySelector('input');
                        if (currentInput && currentInput.value.trim() === '') {
                alert('Por favor, preencha o campo antes de continuar.');
                return;
            }
        
            if (currentStep < steps.length) {
                currentStep++;
                updateStep();
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        }

        document.getElementById('cadastroForm').onsubmit = function(event) {
            event.preventDefault();

            if (currentStep === 5) {
                const nome = document.getElementById('nome').value;
                const cpf = document.getElementById('cpf').value;
                const endereco = document.getElementById('endereco').value;
                const email = document.getElementById('email').value;
                const senha = document.getElementById('senha').value;

                const usuario = new Usuario(nome, cpf, endereco, email, senha);
                usuario.salvar();

                window.location.href = 'login2.html';
            } else {
                alert("Por favor, complete todos os passos.");
            }
        };

        updateStep();