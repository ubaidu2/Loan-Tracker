document.addEventListener("DOMContentLoaded", () => {
    const loanForm = document.getElementById("loanForm");
    const loanList = document.getElementById("loanList");
    let loans = JSON.parse(localStorage.getItem("loans")) || [];

    function renderLoans() {
        loanList.innerHTML = "";
        loans.forEach((loan, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${loan.name}</td>
                <td>${loan.address}</td>
                <td>${loan.phone}</td>
                <td>${loan.product}</td>
                <td>${loan.amount}</td>
                <td>${loan.paid ? "Paid" : "Pending"}</td>
                <td>
                    <button class="paid" onclick="markPaid(${index})">Mark Paid</button>
                    <button class="delete" onclick="deleteLoan(${index})">Delete</button>
                </td>
            `;
            loanList.appendChild(row);
        });
        localStorage.setItem("loans", JSON.stringify(loans));
    }

    window.markPaid = (index) => {
        loans[index].paid = true;
        renderLoans();
    };

    window.deleteLoan = (index) => {
        loans.splice(index, 1);
        renderLoans();
    };

    loanForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newLoan = {
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value,
            product: document.getElementById("product").value,
            amount: document.getElementById("amount").value,
            paid: false
        };
        loans.push(newLoan);
        renderLoans();
        loanForm.reset();
    });

    renderLoans();
});
