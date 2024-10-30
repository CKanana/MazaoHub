document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabs = document.querySelectorAll('.list-group-item');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            // Activate selected tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding content
            tabContents.forEach(content => content.classList.remove('active', 'show'));
            tabContents[index].classList.add('active', 'show');
        });
    });

    // Image Preview for Profile Picture
    const fileInput = document.querySelector('.account-settings-fileinput');
    const profileImage = document.querySelector('.ui-w-80');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    });

    // Form Validation for Password Change
    const passwordForm = document.querySelector('#account-change-password');
    const currentPassword = passwordForm.querySelector('input[name="current-password"]');
    const newPassword = passwordForm.querySelector('input[name="new-password"]');
    const repeatPassword = passwordForm.querySelector('input[name="repeat-new-password"]');
    const saveButton = document.querySelector('.btn-primary');

    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (newPassword.value !== repeatPassword.value) {
            alert('New passwords do not match.');
            return;
        }
        if (newPassword.value.length < 8) {
            alert('New password must be at least 8 characters long.');
            return;
        }
        
        alert('Changes saved successfully.');
        // Here, you can add code to save changes, like an AJAX call to the server.
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".list-group-item-action");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("show", "active"));

            // Add active class to clicked tab and corresponding content
            tab.classList.add("active");
            const paneId = tab.getAttribute("href").substring(1);
            document.getElementById(paneId).classList.add("show", "active");
        });
    });
});