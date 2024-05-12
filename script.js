document.addEventListener('DOMContentLoaded', function () {
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    const tableBody = document.querySelector('#invoiceTable tbody');
    const totalElement = document.getElementById('total');
    const invoiceNumberInput = document.getElementById('invoiceNumberInput');
    const dateInput = document.getElementById('dateInput');
    const dateInputTwo = document.getElementById('dateInputTwo');
    const logoUpload = document.getElementById('img');
    const logoImage = document.getElementById('logoImage');
    const overlayImageContainer = document.getElementById('overlayImageContainer');

    // Function to update total
    function updateTotal() {
        let totalWithoutTax = 0;
        let totalCountTax = 0;
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const quantity = parseFloat(row.cells[3].querySelector('input').value) || 0;
            const price = parseFloat(row.cells[4].querySelector('input').value) || 0;
            const taxPercentage = parseFloat(row.cells[6].querySelector('input').value) || 0;

            const itemTotal = quantity * price;
            const tax = (itemTotal * (taxPercentage / 100));
            const itemTotalWithTax = itemTotal + tax;

            // Update Without Tax and Count Tax values
            row.cells[5].querySelector('input').value = itemTotal.toFixed(2); // Two decimal places
            row.cells[7].querySelector('input').value = tax.toFixed(2); // Two decimal places

            totalWithoutTax += itemTotal;
            totalCountTax += tax;

            row.cells[row.cells.length - 1].textContent = itemTotalWithTax.toFixed(2) + '€'; // Two decimal places
        }

        // Update total values
        totalElement.textContent = 'Total: ' + (totalWithoutTax + totalCountTax).toFixed(2) + '€'; // Two decimal places
    }

    // Add item button event listener
    addItemBtn.addEventListener('click', function () {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input class="number" type="text" placeholder="num"></td>
            <td><textarea class="description" type="text" placeholder="description" rows="2"></textarea></td>
            <td><input class="unit" type="text" placeholder="mu"></td>
            <td><input class="quantity" type="number" min="0" step="0.01"></td>
            <td><input class="unit-price" type="number" min="0" step="0.01"></td>
            <td><input class="without-tax" type="text" readonly></td>
            <td><input class="tax" type="number" placeholder="%" step="0"></td>
            <td><input class="count-tax" type="text" readonly></td>
            <td>0€</td>
        `;
        tableBody.appendChild(newRow);
        updateTotal();
    });

    // Remove item button event listener
    removeItemBtn.addEventListener('click', function () {
        const rows = tableBody.getElementsByTagName('tr');
        if (rows.length > 0) {
            tableBody.removeChild(rows[rows.length - 1]);
            updateTotal();
        }
    });

    // Input event listener for table body
    tableBody.addEventListener('input', function () {
        updateTotal();
    });

    // Input event listener for invoice number input
    invoiceNumberInput.addEventListener('input', function () {
        const invoiceNumber = invoiceNumberInput.value.trim();
        document.getElementById('invoiceNumber').textContent = invoiceNumber !== '' ? 'Invoice Number: ' + invoiceNumber : '';
    });


    // Function to handle file inputs
    function handleFileInputs(input) {
        var val = input.value,
            valArray = val.split('\\'),
            newVal = valArray[valArray.length - 1],
            button = input.nextElementSibling,
            fakeFile = button.nextElementSibling;
        
            if (newVal !== '') {
                button.textContent = '';
                // Hide or remove the element containing the description
                if (fakeFile) {
                    fakeFile.style.display = 'none'; // Hide the element
                    // Alternatively, you can remove the element from the DOM:
                    // fakeFile.parentNode.removeChild(fakeFile);
                }
            }
        }
  
        // Bind the handleFileInputs function to file input elements
        var fileInputs = document.querySelectorAll('.file-wrapper input[type=file]');
        fileInputs.forEach(function(input) {
            input.addEventListener('change', function() {
            handleFileInputs(this);
            });
        });
  
        // Function to read the URL of uploaded image
        function readURL(input) {
            if (input.files && input.files[0]) {
            var reader = new FileReader();
            var tmppath = URL.createObjectURL(input.files[0]);
        
            reader.onload = function (e) {
                document.getElementById('img-uploaded').src = e.target.result;
                document.querySelector('input.img-path').value = tmppath;
            };
        
            reader.readAsDataURL(input.files[0]);
            }
        }
  
        // Bind the readURL function to uploader elements
        var uploaders = document.querySelectorAll('.uploader');
        uploaders.forEach(function(uploader) {
            uploader.addEventListener('change', function() {
            readURL(this);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const addInvoiceInfoBtn = document.getElementById('addInvoiceInfoBtn');
    const removeInvoiceInfoBtn = document.getElementById('removeInvoiceInfoBtn');
    const invoiceInfoDiv = document.querySelector('.invoice-info');

    // Function to add input field for invoice info
    function addInvoiceInfoInput() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Insert invoice info');
        invoiceInfoDiv.appendChild(input);
    }

    // Function to remove input field for invoice info
    function removeInvoiceInfoInput() {
        const inputs = invoiceInfoDiv.querySelectorAll('input');
        if (inputs.length > 0) {
            invoiceInfoDiv.removeChild(inputs[inputs.length - 1]);
        }
    }

    // Add invoice info button event listener
    addInvoiceInfoBtn.addEventListener('click', function () {
        addInvoiceInfoInput();
    });

    // Remove invoice info button event listener
    removeInvoiceInfoBtn.addEventListener('click', function () {
        removeInvoiceInfoInput();
    });
});

