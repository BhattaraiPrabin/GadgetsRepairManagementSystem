document.addEventListener("DOMContentLoaded", function () {
    function fetchData() {
        fetch("http://localhost:4000/api/user")
            .then((response) => response.json())
            .then((data) => displayData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }

    function fetchUserData(userId) {
        return fetch("http://localhost:4000/api/user/" + userId)
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching user data:", error));
    }

    function sendPutRequest(url, data) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json());
    }

    function deleteUserData(userId) {
        return fetch("http://localhost:4000/api/user/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            // You can include credentials if needed (e.g., for authentication)
            // credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    if (response.status === 204) {
                        return null;
                    }
                    return response.json();
                } else {
                    return Promise.reject("Error deleting user: " + response.statusText);
                }
            })
            .catch((error) => Promise.reject(error));
    }

    function displayData(users) {
        var tableBody = document
            .getElementById("userTable")
            .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        users.forEach(function (user) {
            var row = tableBody.insertRow();
            // row.insertCell().innerHTML =
            //     '<img src="/img/team-1.jpg' +
            //     user.profilePicture +
            //     '" width="50" style="border: 1px solid gray">';
            row.insertCell().innerHTML = user.fullName;
            row.insertCell().innerHTML = user.contact;
            row.insertCell().innerHTML = user.email;
            row.insertCell().innerHTML = user.userType;
            row.insertCell().innerHTML = user.dob;
            row.insertCell().innerHTML = user.gender;
            row.insertCell().innerHTML = user.registerDate;
            row.insertCell().innerHTML = user.subscriptionStatus;
            row.insertCell().innerHTML = user.gadgets;

            var editCell = row.insertCell();
            var editButton = document.createElement("button");
            editButton.className = "btn btn-link edit-btn";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.setAttribute("data-toggle", "modal");
            editButton.addEventListener("click", function () {
                openEditModal(user._id);
            });
            editCell.appendChild(editButton);

            var deleteCell = row.insertCell();
            var deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-link delete-btn";
            deleteButton.innerHTML = '<i class="dw dw-delete-3"></i>';
            deleteButton.addEventListener("click", function () {
                openDeleteModal(user._id);
            });
            deleteCell.appendChild(deleteButton);
        });
    }

    function openDeleteModal(userId) {
        var deleteModal = new bootstrap.Modal(document.getElementById("delete"));
        deleteModal.show();
        console.log("Delete user with ID:", userId);

        // Listen to the "Yes" button click to perform the delete action
        document
            .getElementById("deleteYesBtn")
            .addEventListener("click", function () {
                deleteUserData(userId)
                    .then((response) => {
                        console.log("User deleted successfully:", response);

                        deleteModal.hide();
                    })
                    .catch((error) => console.error("Error deleting user:", error));
            });
    }

    function openEditModal(userId) {
        console.log("Edit user with ID:", userId);
        fetchUserData(userId).then((user) => {
            document.getElementById("editId").value = userId;
            document.getElementById("editFullName").value = user.fullName;
            document.getElementById("editContact").value = user.contact;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editUserType").value = user.userType;
            document.getElementById("editDOB").value = user.dob;
            document.getElementById("editGender").value = user.gender;
            document.getElementById("editRegisteredDate").value = user.registerDate;
            document.getElementById("editScscription").value =
                user.subscriptionStatus;
            document.getElementById("editGadget").value = user.gadgets.join(", ");
            document.getElementById("editPayment").value = user.payments.join(", ");
            document.getElementById("editStatus").value = user.status;

            var editModal = new bootstrap.Modal(document.getElementById("edit"));
            editModal.show();
        });
    }

    function getEditedUserData() {
        var editedUserData = {
            _id: document.getElementById("editId").value,
            fullName: document.getElementById("editFullName").value,
            contact: document.getElementById("editContact").value,
            email: document.getElementById("editEmail").value,
            userType: document.getElementById("editUserType").value,
            dob: document.getElementById("editDOB").value,
            gender: document.getElementById("editGender").value,
            registeredDate: document.getElementById("editRegisteredDate").value,
            subscription: document.getElementById("editScscription").value,
            gadget: document.getElementById("editGadget").value,
            payment: document.getElementById("editPayment").value,
            status: document.getElementById("editStatus").value,
        };
        return editedUserData;
    }

    // Add event listener for "Save Changes" button
    document
        .getElementById("saveChangesBtn")
        .addEventListener("click", function () {
            var editedUserData = getEditedUserData();
            sendPutRequest(
                "http://localhost:4000/api/user/" + editedUserData._id,
                editedUserData
            )
                .then((response) => {
                    console.log("PUT request successful:", response);
                    var editModal = document.getElementById("edit");
                    editModal.classList.remove("show");
                    editModal.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.body.style.paddingRight = "0";
                    document.querySelector(".modal-backdrop").remove();
                })
                .catch((error) => console.error("Error sending PUT request:", error));
        });

    document
        .getElementById("signupSubmitBtn")
        .addEventListener("click", function () {
            // Create FormData object to store form data
            var formData = new FormData(document.getElementById("signup-form"));
            event.preventDefault();
            console.log(formData);

            // Perform a POST request to your backend endpoint
            fetch("http://localhost:4000/api/user/", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    console.log("Signup successful:", response.json());
                    var signupModal = new bootstrap.Modal(
                        document.getElementById("signupModal")
                    );
                    signupModal.hide();
                    var signupModal = document.getElementById("signupModal");
                    signupModal.classList.remove("show");
                    signupModal.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.body.style.paddingRight = "0";
                    document.querySelector(".modal-backdrop").remove();
                })
                .catch((error) => {
                    console.error("Error during signup:", error);
                    // Handle errors, display an alert, etc.
                });
        });

    fetchData();
});