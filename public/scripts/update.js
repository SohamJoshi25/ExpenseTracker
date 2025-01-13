/**
 * Handle form submission for updating an expense.
 * @param {Event} event - The form submit event.
 */
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    try {
        const form = event.target;
        const id = window.location.pathname.split("/").pop();
        const formData = new FormData(form);
        const data = { _id: id };

        // Collect non-empty form fields
        for (const [key, value] of formData.entries()) {
            if (value.trim() !== "") {
                data[key] = value;
            }
        }

        const response = await fetch("/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Expense updated successfully.");
            window.location.href = "/";
        } else {
            throw new Error("Failed to update expense.");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(error);
    }
};
