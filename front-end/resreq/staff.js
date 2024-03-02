document.addEventListener("DOMContentLoaded", function() {
    function fetchDataAndDisplay() {
        console.log("Fetching data...");
        fetch("http://localhost:4000/api/staff")
            .then((response) => response.json())
            .then((data) => {
                console.log("Data fetched successfully:", data);
                displayData(data); // Display the fetched data on the table
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    function fetchStaffData(userId) {
        return fetch("http://localhost:4000/api/staff/" + userId)
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

    function displayData(staffs) {
        console.log("Displaying data:", staffs);

        // Assuming you have a table with the id "staffTable" in your HTML
        var tableBody = document
            .getElementById("staffTable")
            .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        staffs.forEach(function(staff) {
            var row = tableBody.insertRow();
            // row.insertCell().innerHTML =
            //     '<img src="' +
            //     staff.profilePicture +
            //     '" width="50" style="border: 1px solid gray">';
            row.insertCell().innerHTML = staff.staffName;
            row.insertCell().innerHTML = staff.address;
            row.insertCell().innerHTML = staff.contact;
            row.insertCell().innerHTML = staff.email;
            row.insertCell().innerHTML = staff.staffType;
            row.insertCell().innerHTML = staff.dob;
            row.insertCell().innerHTML = staff.gender;

            var editCell = row.insertCell();
            var editButton = document.createElement("button");
            editButton.className = "btn btn-link edit-btn";
            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            editButton.setAttribute("data-toggle", "modal");
            editButton.addEventListener("click", function() {
                openEditModal(staff._id);
            });
            editCell.appendChild(editButton);
        });

        console.log("Data displayed on the table.");
    }

    document
        .getElementById("staffSignupSubmitBtn")
        .addEventListener("click", function() {
            // Create FormData object to store form data
            var formData = new FormData(document.getElementById("staff-signup-form"));
            event.preventDefault();
            console.log(formData);

            // Perform a POST request to your backend endpoint
            fetch("http://localhost:4000/api/staff/", {
                    method: "POST",
                    body: formData,
                })
                .then((response) => {
                    if (response.status === 201) {
                        console.log("Signup successful:", response.json());
                        var signupModal = document.getElementById("add_technician");
                        signupModal.classList.remove("show");
                        signupModal.style.display = "none";
                        document.body.classList.remove("modal-open");
                        document.body.style.paddingRight = "0";
                        document.querySelector(".modal-backdrop").remove();
                    }
                })
                .catch((error) => {
                    console.error("Error during signup:", error);
                    // Handle errors, display an alert, etc.
                });
        });


    fetchDataAndDisplay();

    function openEditModal(staffId) {
        console.log("Edit staff with ID:", staffId);
        fetchStaffData(staffId).then((staff) => {
            document.getElementById("editId").value = staffId;
            document.getElementById("editStaffName").value = staff.staffName;
            document.getElementById("editContact").value = staff.contact;
            document.getElementById("editEmail").value = staff.email;
            document.getElementById("editStaffType").value = staff.staffType;
            document.getElementById("editDOB").value = staff.dob;
            document.getElementById("editGender").value = staff.gender;

            var editModal = new bootstrap.Modal(document.getElementById("edit"));
            editModal.show();
        });
    }

    document
        .getElementById("saveChangesBtn")
        .addEventListener("click", function() {
            var editedStaffData = getEditedStaffData();
            sendPutRequest(
                    "http://localhost:4000/api/staff/" + editedStaffData._id,
                    editedStaffData
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

    function getEditedStaffData() {
        var editedStaffData = {
            _id: document.getElementById("editId").value,
            fullName: document.getElementById("editStaffName").value,
            contact: document.getElementById("editContact").value,
            email: document.getElementById("editEmail").value,
            userType: document.getElementById("editStaffType").value,
            dob: document.getElementById("editDOB").value,
            gender: document.getElementById("editGender").value,
        };
        return editedStaffData;
    }
});