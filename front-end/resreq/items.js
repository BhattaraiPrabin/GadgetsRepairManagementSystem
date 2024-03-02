document.addEventListener("DOMContentLoaded", function () {

    function fetchGadgets() {
        fetch('http://localhost:4000/api/gadget')
            .then(response => response.json())
            .then(gadgets => {
                displayGadgets(gadgets);
            })
            .catch(error => console.error('Error fetching gadgets:', error));
    }

    function displayGadgets(gadgets) {
        const gadgetsDeck = document.getElementById("gadgetsDeck");

        gadgets.forEach(async gadget => {
            const card = document.createElement("div");
            card.className = "card mb-4";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body container-fluid row";

            ['Brand', 'Gadget Details', 'Issue'].forEach(async sectionTitle => {
                const col = document.createElement("div");
                col.className = "col-md-4";

                const title = document.createElement("h5");
                title.className = "card-title";
                title.textContent = sectionTitle;

                const list = document.createElement("ul");
                list.className = "list-unstyled";

                if (sectionTitle === 'Brand') {
                    // console.log({ gadget })
                    const brandFields = ['category', 'details', 'brand', 'model', "serialNo", "serviceTag", "emiNo", "warranty"];
                    brandFields.forEach(field => {
                        const value = gadget[field];
                        if (value !== undefined) {
                            const listItem = document.createElement("li");
                            listItem.innerHTML = `<strong>${field}:</strong> ${value}`;
                            list.appendChild(listItem);
                        }
                    });
                } else {
                    const additionalData = await fetchAdditionalData(gadget._id, sectionTitle.replace(" ", "").toLowerCase());

                    if (additionalData) {
                        const additionalField = ["type", "description", "repairStatus", "assignedDate", "mouse", "ram", "ssd", "hdd", "charger", "other"];
                        // console.log({additionalData})
                        additionalField.forEach(field => {
                            const value = additionalData[field];
                            // console.log({field}, {value})
                            if (value !== undefined) {
                                const listItem = document.createElement("li");
                                listItem.innerHTML = `<strong>${field}:</strong> ${value}`;
                                list.appendChild(listItem);
                            }
                        });
                    } else {
                        const listItem = document.createElement("li");
                        listItem.textContent = "Not available";
                        list.appendChild(listItem);
                    }
                }

                const buttonsDiv = document.createElement("div");
                buttonsDiv.className = "mt-3";

                const editButton = document.createElement("button");
                editButton.className = "btn btn-info mr-2";
                editButton.textContent = "Edit";

                const deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Delete";

                // Add event listeners or any other functionality to buttons if needed

                // buttonsDiv.appendChild(editButton);
                // buttonsDiv.appendChild(deleteButton);

                col.appendChild(title);
                col.appendChild(list);
                col.appendChild(buttonsDiv);

                cardBody.appendChild(col);
            });

            // Issue Section
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";

            const addMoreDetailsButton = document.createElement("button");
            addMoreDetailsButton.className = "btn btn-success mr-2";
            addMoreDetailsButton.textContent = "Add More Details";
            addMoreDetailsButton.setAttribute("data-target", "#addGadgetDetailsModal")
            addMoreDetailsButton.setAttribute("data-backdrop", "static")
            addMoreDetailsButton.setAttribute("data-toggle", "modal")
            addMoreDetailsButton.id = "addMoreDetailsButton"

            addMoreDetailsButton.addEventListener("click", function () {
                const gadgetId = gadget._id;
                addGadgetDetailsBtn = document.getElementById("addGadgetDetailsBtn")
                addGadgetDetailsBtn.setAttribute("gadgetId", gadgetId)
                console.log("Clicked on gadget with ID:", gadgetId);
            });

            const addIssueButton = document.createElement("button");
            addIssueButton.className = "btn btn-warning";
            addIssueButton.textContent = "Add Issue";
            addIssueButton.setAttribute("data-target", "#registerIssueModal")
            addIssueButton.setAttribute("data-toggle", "modal")
            addIssueButton.id = "addIssueButton"
            
            addIssueButton.addEventListener("click", function (){
                const gadgetId = gadget._id;
                registerIssueBtn = document.getElementById("registerIssueBtn");
                registerIssueBtn.setAttribute("gadgetId", gadgetId)
                console.log("Clicked on gadget with ID:", gadgetId);
            })


            // Add event listeners to buttons if needed

            cardFooter.appendChild(addMoreDetailsButton);
            cardFooter.appendChild(addIssueButton);

            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            gadgetsDeck.appendChild(card);
        });
    }

    async function fetchAdditionalData(gadgetId, section) {
        try {
            const response = await fetch(`http://localhost:4000/api/${section}/`);
            const data = await response.json();
            // console.log({data})
            const matchingItem = data.find(item => item.gadgetId === gadgetId);
            if (matchingItem) {
                // console.log({matchingItem});
                return matchingItem;
            }

        } catch (error) {
            console.error(`Error fetching ${section} data for gadget ${gadgetId}:`, error);
            return null;
        }
    }

    fetchGadgets();

    document.getElementById("addNewGadgetBtn").addEventListener("click", function (){
        // Fetch users and populate the select options
        fetch("http://localhost:4000/api/user")
        .then(response => response.json())
        .then(users => {
        const userSelect = document.getElementById("user");

        userSelect.innerHTML = "";

        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user._id;
            option.text = user.fullName;
            userSelect.add(option);
        });
        })
        .catch(error => console.error("Error fetching users:", error));
    });

    document
        .getElementById("addGadgetBtn")
        .addEventListener("click", function () {
            event.preventDefault();
            var formData = new FormData(document.getElementById("add-gadget-form"));

            var selectedUserId = document.getElementById("user").value;
            formData.append('userId', selectedUserId);
            console.log({selectedUserId})

            fetch("http://localhost:4000/api/gadget", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw new Error("Bad Request");
                    }
                })
                .then((data) => {
                    console.log("Gadget added successfully:", data);
                    var signupModal = document.getElementById("addGadget");
                    signupModal.classList.remove("show");
                    signupModal.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.body.style.paddingRight = "0";
                    document.querySelector(".modal-backdrop").remove();
                })
                .catch((error) => {
                    console.error("Error during adding gadget:", error);
                });
        });


    document
        .getElementById("addGadgetDetailsBtn")
        .addEventListener("click", function () {
            event.preventDefault();
            var formData = new FormData(document.getElementById("addGadgetDetailsForm"));
            console.log(formData);

            var gadgetId = this.getAttribute("gadgetId");
            console.log({ gadgetId });

            formData.append("gadgetId", gadgetId)
            fetch("http://localhost:4000/api/gadgetdetails", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw new Error("Bad Request");
                    }
                })
                .then((data) => {
                    console.log("Gadget details added successfully:", data);
                    var signupModal = document.getElementById("addGadgetDetailsModal");
                    signupModal.classList.remove("show");
                    signupModal.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.body.style.paddingRight = "0";
                    document.querySelector(".modal-backdrop").remove();
                })
                .catch((error) => {
                    console.error("Error during adding gadget detail:", error);
                });
        });


        
        document
        .getElementById("registerIssueBtn")
        .addEventListener("click", function () {
            event.preventDefault();
            var formData = new FormData(document.getElementById("registerIssueForm"));
            console.log(formData);

            var gadgetId = this.getAttribute("gadgetId");
            console.log({ gadgetId });

            formData.append("gadgetId", gadgetId)
            fetch("http://localhost:4000/api/issue", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw new Error("Bad Request");
                    }
                })
                .then((data) => {
                    console.log("Gadget details added successfully:", data);
                    var signupModal = document.getElementById("registerIssueModal");
                    signupModal.classList.remove("show");
                    signupModal.style.display = "none";
                    document.body.classList.remove("modal-open");
                    document.body.style.paddingRight = "0";
                    document.querySelector(".modal-backdrop").remove();
                })
                .catch((error) => {
                    console.error("Error during adding gadget detail:", error);
                });
        });

});