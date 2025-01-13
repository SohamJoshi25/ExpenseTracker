/**
 * Delete an expense by its ID.
 * @param {string} expenseId - The ID of the expense to delete.
 */
const deleteExpense = async (expenseId) => {
    try {
        const response = await fetch("/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: expenseId }),
        });

        if (response.ok) {
            alert("Expense deleted successfully.");
            window.location.reload();
        } else {
            throw new Error("Failed to delete expense.");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(error);
    }
};

/**
 * Redirect to the update page for a specific expense.
 * @param {string} expenseId - The ID of the expense to update.
 */
const updateExpense = (expenseId) => {
    window.location.href = `/update/${expenseId}`;
};
