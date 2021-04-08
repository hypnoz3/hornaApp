// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')
    console.log('forms ok + forms')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function(form) {
            console.log("in foreach -loop");
            form.addEventListener('submit', function(event) {
                console.log('add eventListener')
                if (!form.checkValidity()) {
                    console.log("validity check failed...");
                    event.preventDefault()
                    event.stopPropagation()
                }
                console.log("validity check OK..");
                form.classList.add('was-validated')
            }, false)
        })
})()